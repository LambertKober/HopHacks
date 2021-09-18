from rest_framework.generics import RetrieveAPIView, ListAPIView

from server.model.schedule import ScheduleSlot
from server.serializer.schedule import ScheduleSerializer


class ScheduleList(ListAPIView):
    queryset = ScheduleSlot.objects.all()
    serializer_class = ScheduleSerializer


class ScheduleItem(RetrieveAPIView):
    queryset = ScheduleSlot.objects.all()
    serializer_class = ScheduleSerializer

    def get_queryset(self):
        sched_id = self.kwargs['schedule_id']
        return ScheduleSlot.objects.filter(id__exact=sched_id)
