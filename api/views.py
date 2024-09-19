from django.shortcuts import render

# Create your views here.
from django.contrib.auth.models import User
from .models import Note
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated,AllowAny


from .serializers import userSerializer, NoteSerializer

class NoteListCreate(generics.ListCreateAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Note.objects.filter(author = user)

    def perform_create(self, serializer):
        user = self.request.user
        if serializer.is_valid():
            serializer.save(author = user)
        else:
            print(serializer.errors)

class NoteDelete(generics.DestroyAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Note.objects.filter(author = user)

class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = userSerializer
    permission_classes = [AllowAny]