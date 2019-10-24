## Table of Contents

- [ Description of features](#description-of-features)

## Vision
VGG-career portal is a job search platform which showcases authentic and genuine jobs.


## Setup

### Dependencies


list of libraries, tools, and technologies used.

- [express.js](https://expressjs.com/) - Fast, unopinionated, minimalist web framework for Node.js
- [Node.js](https://nodejs.org/en/) - A JavaScript runtime environment
- [MongoDB](https://mlab.com/) - For database services
- A package manager - [[NPM](https://www.npmjs.com/)

### Getting Started

- clone the repo - `git clone https://qutech@bitbucket.org/qutech/career-portal-backend.git`
- Navigate to the project directory and open on any editor, VS Code preferably.
- Install the project dependencies by running `npm Install`
- After installation, to start the server run `npm start`

# Description of features



## CREATE ADMIN

An admin registers and their account is created.

```
POST REQUEST
{
	"email":"ally@gmail.com",
	"password":"gerald",
	"fullname":"alvin"
}
https://vgg-career-portal.herokuapp.com/api/createadmin
```

## LOGIN ADMIN

An admin can log in to their account.

```
POST REQUEST
{
	"email":"ally@gmail.com",
	"password":"gerald"
}
https://vgg-career-portal.herokuapp.com/api/loginadmin
```

## ALL ADMIN

We can access all admin from this endpoint

```
GET REQUEST
https://vgg-career-portal.herokuapp.com/api/admin
```
## CURRENT ADMIN

Get the currently logged in admin
- Pass admin Auth token into the header to get the currently logged in admin

```
GET REQUEST
https://vgg-career-portal.herokuapp.com/api/currentadmin
```


## CHANGE ADMIN PASSWORD

An Admin can change their password

```
PATCH REQUEST
https://vgg-career-portal.herokuapp.com/api/admin/changepassword/{USER_ID}

```

## LOGOUT ADMIN

An Admin can log out of their account
- Pass admin Auth token into the header to authorize logout

```
POST REQUEST
https://vgg-career-portal.herokuapp.com/api/logoutadmin
```


## CREATE USER

A user/client registers and their account is created.

```
POST REQUEST
{
	"email":"ally@gmail.com",
	"password":"gerald",
	"fullname":"alvin"
}
https://vgg-career-portal.herokuapp.com/api/createuser
```

## LOGIN USER

A user/client can log in to their account.

```
POST REQUEST
{
	"email":"ally@gmail.com",
	"password":"gerald"
}
https://vgg-career-portal.herokuapp.com/api/loginuser
```

## ALL USERS

We can access all users from this endpoint

```
GET REQUEST
https://vgg-career-portal.herokuapp.com/api/users
```
## CURRENT USERS

Get the currently logged in user
- Pass user Auth token into the header to get the currently logged in user

```
GET REQUEST
https://vgg-career-portal.herokuapp.com/api/currentuser
```


## DELETE USERS

A user can delete their own  account

```
DELETE REQUEST
https://vgg-career-portal.herokuapp.com/api/deleteuser/{USER_ID}

```
## CHANGE USER PASSWORD

A user can change their password

```
PATCH REQUEST
https://vgg-career-portal.herokuapp.com/api/changepassword/{USER_ID}

```
## LOGOUT USERS

A user can log out of their account
- Pass user Auth token into the header to authorize logout

```
POST REQUEST
https://vgg-career-portal.herokuapp.com/api/logout
```





## CREATE JOBS

Only An Admin can create jobs
JobType can only be 'Full-time' , 'Part-time', 'Internship', 'Remote'

```
POST REQUEST
{
	    "JobDescription":"doctor",
        "JobTitle":"Doctor",
        "jobResponsibilities":"treat patients",
        "companyInformation":"At VGG, we are a holding company",
        "JobType":"Part-time",
        "salary": 200,
		location: 'Lagos
}
https://vgg-career-portal.herokuapp.com/api/createjob
```

## SEARCH JOB

A user can search for a Job.
```

GET REQUEST
{
	 "JobTitle": "soft",
    "JobType":"full-time",
    "location":"Lagos"
}
```
## ALL JOBS

Get all jobs from this endpoint

```
GET REQUEST
https://vgg-career-portal.herokuapp.com/api/jobs
```
## GET A  JOB

Get a job from this endpoint

```
GET REQUEST
https://vgg-career-portal.herokuapp.com/api/job/{JOB_ID}
```

## UPDATE A  JOB

Update a job from this endpoint

```
PATCH REQUEST
{
    "JobDescription": "Engineering field",
    "JobTitle": "Engineer",
    "jobResponsibilities": "Create machines that work",
    "companyInformation": "At VGG, we are a holding company",
    "JobType": "Full-time",
    "salary": 20099
}
https://vgg-career-portal.herokuapp.com/api/job/{JOB_ID}
```

## DELETE A  JOB

Delete a job from this endpoint

```
DELETE REQUEST

https://vgg-career-portal.herokuapp.com/api/job/{JOB_ID}
```



## CREATE BLOGPOST

Only An Admin can create blog post

```
POST REQUEST
{
	 "BlogDescription":"this b log",
     "BlogTitle":"How to get a job"
}
https://vgg-career-portal.herokuapp.com/api/createblog
```


## ALL BLOGS

Get all blogs from this endpoint

```
GET REQUEST
https://vgg-career-portal.herokuapp.com/api/blogs
```
## GET A BLOG

Get a blog from this endpoint

```
GET REQUEST
https://vgg-career-portal.herokuapp.com/api/blog/{BLOG_ID}
```



## DELETE A  BLOG

Delete a blog from this endpoint

```
DELETE REQUEST

https://vgg-career-portal.herokuapp.com/api/blog/{BLOG_ID}
```


## CREATE COMMENT

A user can comment on a  blog post

```
POST REQUEST
{
	 "comment":"REAL ONE"
}
https://vgg-career-portal.herokuapp.com/api/createcomment
```

## ALL COMMENTS

Get all comments  from this endpoint

```
GET REQUEST
https://vgg-career-portal.herokuapp.com/api/comments
```
## DELETE A COMMENT

A user can delete their comment

```
DELETE REQUEST
https://vgg-career-portal.herokuapp.com/api/comment/{COMMENT_ID}
```