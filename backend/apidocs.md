# API Documentation 


## Job Searching

```
POST api://jobsearch


body
-----------------------
{
    userid: REQUIRED str ID of user e.g. "clara.franco",
    location: OPTIONAL [str] city names as a string e.g. "Melbourne Sydney"
    careerlevel: OPTIONAL int career level 
    keywords: OPTIONAL [str] keywords to include in search e.g. "java drones"
    department: OPTIONAL str any accenture group e.g. "Accenture Technology"
}


returns     application/json
-----------------------
{
    successful: bool,
    totalhits: int,
    hits: [
        {
            jobid: str,
            title: str,
            description: str,
            location: str,
            startdate: str,
            enddate: str,
            status: str (e.g "open", "closed),
            careerLevelFrom: int, 
            careerLevelTo: int,
            quadrant1: str,
            quadrant2: str
        }
    ]
    
}
```


## Logging in

```
POST api://login

body        application/json
-----------------------
{
    userid: str REQUIRED
    password: str REQUIRED
}

returns     application/json
-----------------------
{
    successful: bool
    userid: str
}

```


## Adding favourites

```
POST api://addfavourite

body        application/json
-----------------------
{
    jobid: str REQUIRED
}

returns     application/json
-----------------------
{
    successful: bool,
}


```



## Get User Info
```

POST api://userinfo

body        application/json
-----------------------
{
    userid: str REQUIRED
}



returns     application/json
-----------------------
{
    successful: bool,
    name: str,
    strengths: str,
    interests: str
}


```