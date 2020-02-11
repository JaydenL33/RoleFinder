# RoleFinder
Accenture's internal role finder. The role finder will uses Gallup's personalities strength assessments to 
construct an idea of potential jobs that existing Accenture Employee's may like to change their role too. 



## Running the application server

```
python3 -m venv venv            # Create virtual environment
source venv/bin/activate        
pip3 install flask              # Install flask

export FLASK_APP=server.py      
flask run                       # Start the development server
```