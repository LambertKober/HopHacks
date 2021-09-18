from datetime import datetime, timedelta


class TimeBlock:
    def __init__(self, start: datetime, end: datetime, interval_m:int):
        self.start = start
        self.end = end
        self.td_interval = timedelta(minutes=interval_m)

    def to_start_times(self):
        output = []
        for i in range(0, (self.end - self.start)//self.td_interval):
            output.append(self.start + self.td_interval * i)
        return output

    @staticmethod
    def list_from_sorted_starts(start_times: list[datetime], interval_m: int):
        output: list[TimeBlock] = [TimeBlock(start_times[0], start_times[0] + timedelta(minutes=interval_m), interval_m)]
        cur = 0
        for start_time in start_times:
            if start_time - output[cur].end > timedelta(0):
                output.append(TimeBlock(start_time, start_time + timedelta(minutes=interval_m), interval_m))
                cur += 1
            else:
                output[cur].end = start_time + timedelta(minutes=interval_m)
        return output
