package com.revature.DataService.aop;


import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.AfterThrowing;
import org.aspectj.lang.annotation.Aspect;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;


@Aspect
@Component
public class AopControllers {

  Logger logger = LoggerFactory.getLogger(AopControllers.class);

  @AfterReturning(value = "within(com.revature.DataService..*)", returning = "result")
  public void after(JoinPoint jp, Object result) {
    logger.info("method {}", jp.toShortString());
  }

  @AfterThrowing(value = "within(com.revature.DataService..*)", throwing = "error")
  public void afterThrow(JoinPoint jp, Throwable error) {
    logger.error("method {} threw exception {}", jp.toShortString(), error.getMessage());
  }
}
