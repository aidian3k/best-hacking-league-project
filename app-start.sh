#!/bin/zsh
docker run -e POSTGRES_USER=root -e POSTGRES_PASSWORD=root -p 5432:5432 -d postgres
./gradlew bootRun --args='--spring.profiles.active=local'