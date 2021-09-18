from rest_framework.generics import RetrieveAPIView, ListAPIView

from server.model.schedule import Schedule
from server.serializer.schedule import ScheduleSerializer


class ScheduleList(ListAPIView):
    queryset = Schedule.objects.all()
    serializer_class = ScheduleSerializer


class ScheduleItem(RetrieveAPIView):
    queryset = Schedule.objects.all()
    serializer_class = ScheduleSerializer

    def get_queryset(self):
        sched_id = self.kwargs['schedule_id']
        return Schedule.objects.filter(id__exact=sched_id)
