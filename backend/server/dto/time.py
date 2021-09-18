from datetime import datetime, timedelta


class TimeBlock:
    def __init__(self, start: datetime, end: datetime, interval_m:int):
        self.start = start
        self.end = end
        self.td_interval = timedelta(minutes=interval_m)

    def to_start_times(self):
        output = []
        for i in range(0, (self.end - self.start)//self.td_interval):
            output += self.start + self.td_interval
        return output

    @staticmethod
    def list_from_sorted_starts(start_times: list[datetime], interval_m: int) -> list[TimeBlock]:
        output: list[TimeBlock] = []
        cur = 0
        for start_time in start_times[1::]:
            if start_time - output[cur].end > timedelta(minutes=interval_m):
                output += TimeBlock(start_time, start_time + timedelta(minutes=interval_m), interval_m)
            else:
                output[cur].end = start_time + timedelta(minutes=interval_m)
        return output
