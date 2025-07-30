from django.forms import ClearableFileInput


class ActuallyClearableFileInput(ClearableFileInput):
    template_name = "venue/widgets/actually_clearable_file_input.html"
