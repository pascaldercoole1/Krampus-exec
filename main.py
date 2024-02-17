import webview # pip install pywebview

def start():
    window = webview.create_window(title='Exploit', url="home.html", zoomable=False, frameless=False, resizable=False, draggable=True, easy_drag=True, height=600, width=1010, background_color="#0f0f10")
    webview.start()

if __name__ == '__main__':
    start()
