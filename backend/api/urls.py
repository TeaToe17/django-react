from django.urls import path, re_path

from .views import NoteListCreate, NoteDelete

from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path("notes/",NoteListCreate.as_view(),name="note_list"),
    path("notes/delete/<int:pk>/",NoteDelete.as_view(),name="delete_note"),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)