import webapp2


class AppHandler(webapp2.RequestHandler):
    def get(self):
        self.response.write("Hello, webapp2!")