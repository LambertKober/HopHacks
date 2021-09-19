from server.scheduler.scheduler import Student, schedule


def get_times_and_caps(sessions):
    time_to_cap = {}
    
    # convert each session to its component time blocks, then
    # merge any overlap by adding the capacities together
    for session in sessions:
        session_times = session.timeblock.to_start_times()
        for time in session_times:
            if time in time_to_cap.keys():
                # already have this block, so just add the times together
                time_to_cap[time] += session.max_students
            else:
                # don't have this block, so insert the time
                time_to_cap[time] = session.max_students
                
    # convert the dictionary to two parallel lists for ease of use in the scheduler
    return list(time_to_cap.keys()), list(time_to_cap.values())
                
                
def time_to_interval_index(time, intervals):
    # precondition: selected times are in the available intervals
    for i, interval in enumerate(intervals):
        if time == interval.start_time:
            # found the index
            return i

# return list of objects where each object contains the id and the scheduled time

# class TimeBlock:
#     def __init__(self, start: datetime, end: datetime, interval_m:int):
#         self.start = start
#         self.end = end
#         self.td_interval = timedelta(minutes=interval_m)
#
#     def to_start_times(self):
#         output = []
#         for i in range(0, (self.end - self.start)//self.td_interval):
#             output.append(self.start + self.td_interval * i)
#         return output
#
#     @staticmethod
#     def list_from_sorted_starts(start_times: list[datetime], interval_m: int):
#         output: list[TimeBlock] = []
#         cur = 0
#         for start_time in start_times[1::]:
#             if start_time - output[cur].end > timedelta(minutes=interval_m):
#                 output += TimeBlock(start_time, start_time +  timedelta(minutes=interval_m), interval_m)
#             else:
#                 output[cur].end = start_time + timedelta(minutes=interval_m)
#         return output



# class Session:
#    def __init__(self, timeblock, ca_uuid, max_students):
#        self.timeblock: TimeBlock = timeblock
#        self.uuid: str = ca_uuid
#        self.max_students = max_students
#
# class Selection:
#     def __init__(self, timeblocks, student_uuid):
#         self.timeblocks: list[TimeBlock] = timeblocks
#         self.uuid: str = student_uuid

# return list of:
# class Schedule:
#     def __init__(self, timeblock, student_uuid):
#         self.start_time: time
#         self.uuid: str = student_uuid

def schedule_students(sessions, selections):
    # sessions is a list of Session model objects
    # selections is a list of the class above
    
    times, caps = get_times_and_caps(sessions)
    
    # convert the student types
    students = []
    
    # compute the indices of the corresponding time blocks
    for selection in selections:
        # list of list of contiguous time intervals
        selected_times = []
        for t in selection.timeblocks:
            selected_times += t.to_start_times()

        print(selected_times)
        print(times)
        inds = [times.index(t) for t in selected_times]
        students.append(Student(selection.student_uuid, inds))
        
    return schedule(students, times, caps)
