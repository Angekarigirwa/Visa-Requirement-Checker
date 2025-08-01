#  Visa Requirement Checker App

A lightweight, Dockerized web application that lets users check visa requirements, embassy information, and other travel restrictions based on their nationality and destination. It leverages the [Visa Requirement API](https://rapidapi.com/jamesbywater/api/visa-requirement/) from RapidAPI and supports deployment on two web servers behind an HAProxy load balancer.

---

##  Docker Image Details

- **Docker Hub Repo:** https://hub.docker.com/repository/docker/angekarigirwa/visachecker
- **Image Name:** `angekarigirwa/visachecker`
- **Tags:** `v1`

---

##  Build Instructions

To build and push the image from your local machine:

```bash
docker build -t visachecker:v1 .
docker tag visachecker:v1 angekarigirwa/visachecker:v1
docker push angekarigirwa/visachecker:v1```

## Run Instructions(Web01 / Web02)

docker run -d -p 8080:80 \
  --name visachecker \
  -e RAPIDAPI_KEY=your_actual_api_key \
  angekarigirwa/visachecker:v1
Replace your_actual_api_key with your actual RapidAPI key.

This runs the app on port 8080 inside the container.

## Load Balancer Configuration (HAProxy on Lb01)
HAProxy configuration:

frontend http_front
    bind *:80
    default_backend visa_back

backend visa_back
    balance roundrobin
    server web01 192.168.10.11:8080 check
    server web02 192.168.10.12:8080 check
To reload HAProxy:

sudo systemctl reload haproxy
# or if using Docker
docker exec -it <haproxy_container_id_or_name> service haproxy reload
 Testing Load Balancer (Round-Robin)
To verify load balancing:


curl http://<Lb01_IP>/
Refresh multiple times and look for changing responses. You can also edit the <h1> in Web01 and Web02 HTML to confirm which server responded.

## Hardening: API Key Security
 Avoid:
Hardcoding API keys directly in script.js.

## Better Approach:
Option 1: Use environment variables


docker run -e RAPIDAPI_KEY=your_key ...
Option 2: Use external JS config


echo "const API_Key = 'your_key_here';" > apikey.js
docker run -v $(pwd)/apikey.js:/usr/share/nginx/html/apikey.js ...
And include apikey.js in your HTML before script.js.

## Project File Structure

VisaRequirements/
├── index.html       # Main frontend UI
├── style.css        # Styling
├── script.js        # Visa API logic
├── Dockerfile       # Builds the image
## Screenshots
Here is a screenshot of the Visa Requirement Checker app running:

<img width="800" alt="Visa Checker Screenshot" src="https://github.com/user-attachments/assets/c43618ab-6231-4330-9eef-1abe25aab444" />
 Demo Video
[![Visa Checker Demo Video](https://img.youtube.com/vi/tYojVU7QGRk/0.jpg)](https://youtu.be/tYojVU7QGRk)

## Author
Ange Karigirwa
Software Engineering @ ALU
[Docker Hub Profile](https://hub.docker.com/u/angekarigirwa)

