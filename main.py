from Server.module.app import AppHandler

app = webapp2.WSGIApplication([
    ('/', HelloWebapp2),
], debug=True)

