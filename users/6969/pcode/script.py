#!/usr/bin/env python
def grade():
 results = usercode()
 if (results == "Hello World!"):
  print("True")
 else:
  print("False")
# Describe this function...
def usercode():
  return 'Hello World!'
if __name__ == "__main__":
  grade()
