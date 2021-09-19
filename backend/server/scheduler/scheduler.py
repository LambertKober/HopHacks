import numpy as np
from scipy.sparse import csr_matrix
from scipy.sparse.csgraph import maximum_flow

# we have student nodes and office hour nodes, as well as the source and sink nodes

# each student contains a list of their selected time blocks
# selected time blocks are sent in the same format as they are stored in the students
# (e.g. not just in time slot ranges, but in individual time slots)

SOURCE = 0
SINK = 1


class Student:
    def __init__(self, id, avails):
        self.id = id
        self.avails = avails


# the output of the scheduler
class Schedule:
    def __init__(self, student_uuid, start_time):
        self.uuid = student_uuid
        self.start_time = start_time


def create_graph(students, times, caps):
    # source -(1s)-> {students} -(1s)-> {office hours} -(max OH capacity)-> sink
    
    # graph node structure: {source} {sink} {students} {office hours}
    
    student_end = 2 + len(students)
    
    # + 2 for the source and sink nodes
    num_nodes = student_end + len(times)
    
    graph = np.zeros((num_nodes, num_nodes), dtype=np.int)
    
    # each student receives up to one ticket from the source
    graph[SOURCE, 2:2 + student_end] = 1
    
    # connect the students to the office hours
    for i, student in enumerate(students):
    
        for interval_index in student.avails:
            # OH indices start at end of students region
            graph[2 + i, student_end + interval_index] = 1
        
    # set the office hour capacities; these arrays should match in length
    graph[student_end:, SINK] = np.array(caps)
    
    return csr_matrix(graph)


# students:
# times: individual 15-min time blocks
# caps: corresponding capacities of those time blocks
def schedule(students, times, caps):
    graph = create_graph(students, times, caps)
    
    # compute a flow graph with max flow
    flow = maximum_flow(graph, SOURCE, SINK).residual.toarray()
    
    # consider the subset of the matrix representing the outflow from the student nodes
    student_end = 2 + len(students)
    outflow = flow[2:student_end, student_end:]
    
    # store the outflux information into the student nodes
    schedules = []
    for i, student_row in enumerate(outflow):
        if 1 in student_row:
            # student was successfully scheduled; create a Schedule object
            # with their student ID and the time they were scheduled
            schedules.append(Schedule(students[i].id, times[list(student_row).index(1)]))
            
    return schedules
