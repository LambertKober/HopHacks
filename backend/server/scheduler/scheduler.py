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
    def __init__(self, id, oh):
        # the final assigned OH
        #self.assignment = None
        self.id = id
        self.avails = oh

def create_graph(students, office_hours, max_oh_cap):
    # source node -(1s)-> {students} -(1s)-> {office hours} -(max OH capacity)-> sink node
    
    # graph node structure: {source} {sink} {students} {office hours}
    
    student_end = 2 + len(students)
    
    # + 2 for the source and sink nodes
    num_nodes = student_end + len(office_hours)
    
    graph = np.zeros((num_nodes, num_nodes), dtype=np.int)
    
    # each student receives up to one ticket from the source
    graph[SOURCE, 2:2 + student_end] = 1
    
    # connect the students to the office hours
    for i, student in enumerate(students):
    
        for oh in student.avails:
            # OH indices start at end of students region
            graph[2 + i, student_end + oh] = 1
        
    # set the office hour capacities
    graph[student_end:, SINK] = max_oh_cap
    
    return csr_matrix(graph);
    

def schedule(students, office_hours, max_oh_cap):
    graph = create_graph(students, office_hours, max_oh_cap)
    
    # compute a flow graph with max flow
    flow = maximum_flow(graph, SOURCE, SINK).residual.toarray()
    
    # consider the subset of the matrix representing the outflow from the student nodes
    student_end = 2 + len(students)
    outflow = flow[2:student_end, student_end:]
    
    # store the outflux information into the student nodes
    for i, student_row in enumerate(outflow):
        if 1 in student_row:
            # student was successfully scheduled
            students[i].assignment = office_hours[list(student_row)].index(1)
        else:
            # don't need to return this student, since didn't schedule anything for them
            students.pop(i)
            
    return students

"""def test(num_students, num_oh, oh_cap):
    oh = list(range(num_oh))
    students = []

    for _ in range(num_students):
        avail = np.sort(np.random.choice(oh, size=1 + np.random.randint(len(oh) - 1), replace=False))
        
        students.append(Student(avail))

    schedule(students, oh, oh_cap)

    for i, student in enumerate(students):
        print("Student " + str(i) + " assigned to " + str(student.assignment) + " (available: " + str(student.avails) + ")")

test(20, 5, 4)"""
