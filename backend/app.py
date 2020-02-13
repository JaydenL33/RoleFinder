# Version 2.0
# Created by Aaron Su 16 Dec 2019

from src import create_app

app = create_app()
import sys

if "everywhere" in sys.argv:
# if __name__ == "__main__":
    app.run(debug=True, host='172.20.10.3')
else:
    app.run(debug=True)
