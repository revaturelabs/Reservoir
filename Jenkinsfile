pipeline {
  agent any
  stages {
    stage('Build DataService') {
      agent any
      when {
        expression {
          env.BRANCH_NAME == 'master' ||

          env.BRANCH_NAME == 'development' ||
          env.BRANCH_NAME == 'development-dataservice' ||
          env.CHANGE_TARGET == 'master' ||
          env.CHANGE_TARGET == 'development' ||
          env.CHANGE_TARGET == 'development-dataservice'
        }

      }
      environment {
        SPRING_PROFILES_ACTIVE = 'local'
      }
      steps {
        sh '''cd p3backend/DataService
chmod +x mvnw
./mvnw package
./mvnw install dockerfile:build'''
      }
    }

    stage('Build FrontEnd') {
      agent {
        docker {
          image 'node:13-alpine'
        }

      }
      when {
        expression {
          env.BRANCH_NAME == 'master' ||

          env.BRANCH_NAME == 'development' ||
          env.BRANCH_NAME == 'development-dataservice' ||
          env.BRANCH_NAME == 'development-reportservice' ||
          env.BRANCH_NAME == 'development-sqsservice' ||
          env.CHANGE_TARGET == 'master' ||
          env.CHANGE_TARGET == 'development' ||
          env.CHANGE_TARGET == 'development-dataservice' ||
          env.CHANGE_TARGET == 'development-reportservice' ||
          env.CHANGE_TARGET == 'development-sqsservice'
        }

      }
      environment {
        npm_config_cache = 'npm-cache'
      }
      steps {
        sh '''cd p3frontend/
npm i
npm run build'''
      }
    }

    stage('SonarCloud') {
      when {
        expression {
          env.BRANCH_NAME == 'development'
        }

      }
      environment {
        SONAR_TOKEN = credentials('sonar-token')
      }
      steps {
        sh '''cd p3backend/DataService
chmod +x mvnw
./mvnw verify sonar:sonar'''
      }
    }

  }
}
