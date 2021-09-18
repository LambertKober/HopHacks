import scheduler
import datetime

def get_blocks(sessions):
    # convert the time ranges to 15-min blocks
    blocks = []
    offset = timedelta(minutes=15)
    
    for session in sessions:
        # add blocks for every 15 mins
        
        t = session.start_time
        while t < session.end_time:
            blocks.append(session.start_time)
            t += offset
    
    return blocks

# class TimeRange:
#     start_time
#     stop_time
#
# class SchedulerSelection:
#     student_id: Str
#     session_times: list of TimeRanges

# return list of objects where each object contains the id and the scheduled time

def schedule_students(sessions, selection):
    # sessions is a list of Session model objects
    # selections is a list of the class above
    
    blocks = [get_blocks(session.TimeRange) for session in sessions]
    
    students = []
    
    # convert the student types
    
    # compute the indices of the corresponding time blocks
    for s in selection:
        s_blocks = get_blocks(selection.session_times);
        inds = [blocks.index(t) for t in s_blocks]
        students.append(Student(selection.student_id, inds))
        
    # this should be passed to this code somehow...
    OH_STUDENT_CAP = 10
    return schedule(students, blocks, OH_STUDENT_CAP)
