package com.revature.pkg.controller;

import java.sql.Date;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.aws.messaging.core.QueueMessagingTemplate;

import org.springframework.jms.annotation.JmsListener;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Component;

import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.revature.pkg.repository.AssociateRepository;
import com.revature.pkg.repository.BatchRepository;
import com.revature.pkg.repository.ClientRepository;
import com.revature.pkg.repository.ClientdemandRepository;
import com.revature.pkg.repository.ConsentRepository;
import com.revature.pkg.repository.CurriculumRepository;
import com.revature.pkg.repository.LocationRepository;
import com.revature.pkg.repository.SkillsRepository;
import com.revature.pkg.repository.SkillsetRepository;
import com.revature.pkg.repository.TrainerRepository;
import com.revature.pkg.repository.TrainerbatchRepository;
import com.revature.pkg.service.AssociateService;
import com.revature.pkg.service.BatchService;
import com.revature.pkg.service.CurriculumService;
import com.revature.pkg.service.LocationService;
import com.revature.pkg.service.SkillsetService;
import com.revature.pkg.service.TrainerService;
import com.revature.pkg.service.TrainerbatchService;


@Component
public class SqsController {
	
	private static final Logger LOG = LoggerFactory.getLogger(SqsController.class);
	
	@Autowired
	@SuppressWarnings("unused")
	private QueueMessagingTemplate queueMessagingTemplate;
	
	@Autowired
	  AssociateRepository associateData;
	@Autowired
	  AssociateService associateService;
	@Autowired
	  BatchRepository batchData;
	@Autowired
	  BatchService batchService;
	@Autowired
	ClientRepository clientData;
	@Autowired
	  ClientdemandRepository clientdemandData;
	@Autowired
	  ConsentRepository consentData;
	@Autowired
	CurriculumRepository curriculumData;
	@Autowired
	CurriculumService curriculumService;
	@Autowired
	  LocationRepository locationData;
	@Autowired
	  LocationService locationService;
	@Autowired
	  SkillsRepository skillsdata;
	@Autowired
	  SkillsetRepository skillsetData;
	@Autowired
	  SkillsetService skillsetService;
	@Autowired
	  SkillsetRepository skillsetskillsData;
	@Autowired
	  TrainerRepository trainerData;
	@Autowired
	  TrainerService trainerService;
	@Autowired
	  TrainerbatchRepository trainerbatchData;
	@Autowired
	  TrainerbatchService trainerbatchService;
	@Autowired
	  TrainerbatchRepository trainerskillsdata;
	

	@Value("${URL}")
	private String sqsEndPoint;
	

	//Batch -- needs to wait
	public void handleBatch(JsonArray jsonArray, String request) {	
		LOG.info("this is batch & ("+ request +") "+jsonArray.toString());
		if(request.equals("update")) {
			LOG.info("start updation");
			//update start
			for(JsonElement element : jsonArray) {
				JsonObject singleObject = element.getAsJsonObject();
				Integer BatchId = singleObject.get("batchId").getAsInt();
				
				boolean checkBatch = batchService.checkBatchById(BatchId);
				if(checkBatch) {

				boolean checkLocation = locationService.checkLocation(singleObject.get("location").getAsString());
				boolean checkCurriculum= curriculumService.checkCurriculum(singleObject.get("curriculum").getAsString());
				if(!checkLocation) {
					LOG.info("location found: "+ checkLocation + " creating new location" );
					locationData.createLocation(singleObject.get("location").getAsString());
				}
				if(!checkCurriculum) {
					LOG.info("Curriculum found: "+checkCurriculum + " checking skillset" );
					boolean checkSkillset = skillsetService.checkSkillset(singleObject.get("curriculum").getAsString());
					if(!checkSkillset) {
						skillsetData.createSkillset(singleObject.get("curriculum").getAsString());
					}
					Integer skillsetId = skillsetService.getSkillsetInfo(singleObject.get("curriculum").getAsString()).get(0).getSkillSetId();

					curriculumData.createCurriculum(singleObject.get("curriculum").getAsString(),skillsetId);
				}
				Integer interviewScoreLower;
				boolean isconfirmed;
				String programType;
				
				Integer getLocationId = locationService.getLocationInfo(singleObject.get("location").getAsString()).get(0).getLocationId();
				Integer getCurriculumId = curriculumService.getCurriculumInfo(singleObject.get("curriculum").getAsString()).get(0).getCurriculumId();
				@SuppressWarnings("unused")
				Integer getSkillsetId = skillsetService.getSkillsetInfo(singleObject.get("curriculum").getAsString()).get(0).getSkillSetId();
				String startDate = singleObject.get("startDate").getAsString();
				String endDate = singleObject.get("endDate").getAsString();
				@SuppressWarnings("unused")
				String location = singleObject.get("location").getAsString();
				
				//remove all associates belong to this batch
				associateData.unassignAssociates(BatchId);
				LOG.info("warming associates");


				//trainers object array
				
				if(singleObject.has("isConfirmed")) {  isconfirmed = singleObject.get("isConfirmed").getAsBoolean();}else {  isconfirmed = false;}
				if(singleObject.has("programType")) {  programType = singleObject.get("programType").getAsString();}else {  programType = "null";}
				if(singleObject.has("interviewScoreLower")) { interviewScoreLower = singleObject.get("interviewScoreLower").getAsInt();}else {  interviewScoreLower = 0;}

				
				Date dateStart = Date.valueOf(startDate);
				Date dateEnd = Date.valueOf(endDate);

				batchData.updateBatch(dateStart, dateEnd, isconfirmed, interviewScoreLower,programType, getLocationId,
						getCurriculumId,BatchId);
				LOG.info("batch created ");

				LOG.info("batch_id is : /// " + BatchId);

				
				JsonArray trainers = singleObject.get("trainers").getAsJsonArray();
				for(JsonElement trainer : trainers) {
					JsonObject singleTrainer = trainer.getAsJsonObject();
					String trainerFirstname = singleTrainer.get("firstName").getAsString();
					String trainerLastname = singleTrainer.get("lastName").getAsString();
					String trainerEmail = singleTrainer.get("email").getAsString();
					boolean isEligible;
					if(singleTrainer.has("isEligible")) {  isEligible = singleTrainer.get("isEligible").getAsBoolean();}else {  isEligible = true;}
					boolean checkTrainer = trainerService.checkTrainer(trainerEmail);
					LOG.info("working with trainer");
					if(!checkTrainer) {
						trainerData.createTrainer(trainerFirstname, trainerLastname, trainerEmail, isEligible);
						LOG.info("adding a trainer");

					}else {
					LOG.info("Trainer already exist");
					}
					Integer TrainerId = trainerService.getTrainerInfo(trainerEmail).get(0).getTrainerId();
					boolean checkTrainerBatch = trainerbatchService.checkTrainerBatch(TrainerId,BatchId);
					if(!checkTrainerBatch) {
						LOG.info("assignment attempt");
						trainerbatchData.createTrainerBatch(TrainerId, BatchId);
						LOG.info("Trainer assigned to batch");
					}else {
						LOG.info("Trainer was assigned to batch previously .. no action was made");

					}
					
				}
				//associates object array
				JsonArray associates = singleObject.get("associates").getAsJsonArray();
				for(JsonElement associate : associates) {
					JsonObject singleAssociate = associate.getAsJsonObject();
					String associateFirstname = singleAssociate.get("firstName").getAsString();
					String associateLastname = singleAssociate.get("lastName").getAsString();
					String associateEmail = singleAssociate.get("email").getAsString();
					boolean active;
					float score;
					if(singleAssociate.has("active")) {  active = singleAssociate.get("active").getAsBoolean();}else {  active = true;}
					if(singleAssociate.has("interviewScore")) {  score = singleAssociate.get("interviewScore").getAsFloat();}else {  score = 0;}
					boolean checkAssociate = associateService.checkAssociate(associateEmail);
					LOG.info("working with asscoiate");
					if(!checkAssociate) {
						associateData.addAssociates(associateFirstname, associateLastname, associateEmail, active, score, BatchId);
						LOG.info("associate added and assinged to a batch with id: " +BatchId);
					}else {
						associateData.updateAssociates(BatchId, associateEmail);
					LOG.info("Associate already exist-> re-assigned to a batch id of "+BatchId);
					}


				}

//after this line
				}else {
					LOG.info("Batch doesn't exist");
				}
			}
			LOG.info("Continue Listening to SQS");
			//updates ends

		}
		if(request.equals("delete")) {
			LOG.info("start deletion");
			for(JsonElement element : jsonArray) {
				JsonObject singleObject = element.getAsJsonObject();
				Integer batchId = singleObject.get("batchId").getAsInt();
				boolean checkBatch = batchService.checkBatchById(batchId);
				if(checkBatch) {
					
					JsonArray trainers = singleObject.get("trainers").getAsJsonArray();
					for(JsonElement trainer : trainers) {
						JsonObject singleTrainer = trainer.getAsJsonObject();
						Integer trainerId = singleTrainer.get("trainerId").getAsInt();
						//removing trainer from this batch
						trainerbatchData.deleteTrainerBatch(trainerId, batchId);
						LOG.info("trainer removed from batch");
					}
					//remove associate from batch
					associateData.unassignAssociates(batchId);
					LOG.info("associate removed from batch");
					
					//delete Batch
					batchData.deleteBatch(batchId);
					LOG.info("final - batch deleted");
					
				}else {
					LOG.info("no patch with id "+batchId);
				}
				LOG.info("Continue listening");

			}

		}
		if(request.equals("add")) {
			LOG.info("add this to batch");
			for(JsonElement element : jsonArray) {
				JsonObject singleObject = element.getAsJsonObject();
				boolean checkLocation = locationService.checkLocation(singleObject.get("location").getAsString());
				boolean checkCurriculum= curriculumService.checkCurriculum(singleObject.get("curriculum").getAsString());
				if(!checkLocation) {
					LOG.info("location found: "+checkLocation + " creating new location" );
					locationData.createLocation(singleObject.get("location").getAsString());
				}
				if(!checkCurriculum) {
					LOG.info("Curriculum found: "+checkCurriculum + " checking skillset" );
					boolean checkSkillset = skillsetService.checkSkillset(singleObject.get("curriculum").getAsString());
					if(!checkSkillset) {
						skillsetData.createSkillset(singleObject.get("curriculum").getAsString());
					}
					Integer skillsetId = skillsetService.getSkillsetInfo(singleObject.get("curriculum").getAsString()).get(0).getSkillSetId();

					curriculumData.createCurriculum(singleObject.get("curriculum").getAsString(),skillsetId);
				}
				Integer interviewScoreLower;
				boolean isconfirmed;
				String programType;
				
				Integer getLocationId = locationService.getLocationInfo(singleObject.get("location").getAsString()).get(0).getLocationId();
				Integer getCurriculumId = curriculumService.getCurriculumInfo(singleObject.get("curriculum").getAsString()).get(0).getCurriculumId();
				@SuppressWarnings("unused")
				Integer getSkillsetId = skillsetService.getSkillsetInfo(singleObject.get("curriculum").getAsString()).get(0).getSkillSetId();
				String startDate = singleObject.get("startDate").getAsString();
				String endDate = singleObject.get("endDate").getAsString();
				String location = singleObject.get("location").getAsString();
				//trainers object array
				
				if(singleObject.has("isConfirmed")) {  isconfirmed = singleObject.get("isConfirmed").getAsBoolean();}else {  isconfirmed = false;}
				if(singleObject.has("programType")) {  programType = singleObject.get("programType").getAsString();}else {  programType = "null";}
				if(singleObject.has("interviewScoreLower")) { interviewScoreLower = singleObject.get("interviewScoreLower").getAsInt();}else {  interviewScoreLower = 0;}
				LOG.info("locationID : " + getLocationId);
				LOG.info("CurriculmID : " + getCurriculumId);
				LOG.info("startDate : " + startDate);
				LOG.info("endDate : " + endDate);
				LOG.info("location : " + location);
				LOG.info("isconfirmed : " + isconfirmed);
				LOG.info("programType : " + programType);
				LOG.info("interviewScoreLower : " + interviewScoreLower);
				
				Date dateStart = Date.valueOf(startDate);
				Date dateEnd = Date.valueOf(endDate);
				//note swap location programtype
				batchData.createBatch(dateStart, dateEnd, isconfirmed, interviewScoreLower,programType, getLocationId, getCurriculumId);
				LOG.info("batch created ");
				Integer BatchId = batchService.getBatchInfo(getLocationId, getCurriculumId).get(0).getBatchId();
				LOG.info("batch_id is : " + BatchId);

				
				JsonArray trainers = singleObject.get("trainers").getAsJsonArray();
				for(JsonElement trainer : trainers) {
					JsonObject singleTrainer = trainer.getAsJsonObject();
					String trainerFirstname = singleTrainer.get("firstName").getAsString();
					String trainerLastname = singleTrainer.get("lastName").getAsString();
					String trainerEmail = singleTrainer.get("email").getAsString();
					boolean isEligible;
					if(singleTrainer.has("isEligible")) {  isEligible = singleTrainer.get("isEligible").getAsBoolean();}else {  isEligible = true;}
					boolean checkTrainer = trainerService.checkTrainer(trainerEmail);
					LOG.info("working with trainer");
					if(!checkTrainer) {
						trainerData.createTrainer(trainerFirstname, trainerLastname, trainerEmail, isEligible);
						LOG.info("adding a trainer");

					}else {
					LOG.info("Trainer already exist");
					}
					Integer TrainerId = trainerService.getTrainerInfo(trainerEmail).get(0).getTrainerId();
					boolean checkTrainerBatch = trainerbatchService.checkTrainerBatch(TrainerId,BatchId);
					if(!checkTrainerBatch) {
						LOG.info("assignment attempt");
						trainerbatchData.createTrainerBatch(TrainerId, BatchId);
						LOG.info("Trainer assigned to batch");
					}else {
						LOG.info("Trainer was assigned to batch previously .. no action was made");

					}
					
				}
				//associates object array
				JsonArray associates = singleObject.get("associates").getAsJsonArray();
				for(JsonElement associate : associates) {
					JsonObject singleAssociate = associate.getAsJsonObject();
					String associateFirstname = singleAssociate.get("firstName").getAsString();
					String associateLastname = singleAssociate.get("lastName").getAsString();
					String associateEmail = singleAssociate.get("email").getAsString();
					boolean active;
					float score;
					if(singleAssociate.has("active")) {  active = singleAssociate.get("active").getAsBoolean();}else {  active = true;}
					if(singleAssociate.has("interviewScore")) {  score = singleAssociate.get("interviewScore").getAsFloat();}else {  score = 0;}
					boolean checkAssociate = associateService.checkAssociate(associateEmail);
					LOG.info("working with asscoiate");
					if(!checkAssociate) {
						associateData.addAssociates(associateFirstname, associateLastname, associateEmail, active, score, BatchId);
						LOG.info("associate added and assinged to a batch with id: " +BatchId);
					}else {
						associateData.updateAssociates(BatchId, associateEmail);
					LOG.info("Associate already exist-> re-assigned to a batch id of "+BatchId);
					}


				}
				LOG.info("Continue Listening to SQS");


			}
			
		}
}

	//Associate
	public void handleAssociate(JsonArray jsonArray, String request) {	
		LOG.info("working on Associate & ("+ request +")");
		if(request.equals("add")) {
			 int counting = 0;
			LOG.info("adding associates");
			for(JsonElement element : jsonArray) {
				JsonObject singleObject = element.getAsJsonObject();
				try {
					boolean active;
					if(singleObject.has("active")) { active = singleObject.get("active").getAsBoolean(); }else {active = false;}
					boolean checkAssociate = associateService.checkAssociate(singleObject.get("email").getAsString());
					if(!checkAssociate) {
				associateData.addAssociateswithoutBatch(singleObject.get("firstName").getAsString(), singleObject.get("lastName").getAsString()
						, singleObject.get("email").getAsString(),active, singleObject.get("technicalScreeningScore").getAsFloat());
				counting++;
					}else {
						LOG.info("Associate found");	
					}
				}catch(Exception e) {
				LOG.info("Fail to add an Associate");	
				}
			}
			LOG.info("Done.."+counting+" Record handled");
		}
		LOG.info("Continue Listening to SQS");



	}
	//skills
	public void handleSkill(JsonArray jsonArray, String request) {	
		LOG.info("working on skills & ("+ request +")");
		if(request.equals("add")) {
			 int counting = 0;
			LOG.info("adding skills");
		
			for(JsonElement element : jsonArray) {
				JsonObject singleObject = element.getAsJsonObject();
				try {
				skillsdata.addSkill(singleObject.get("skillId").getAsInt(), singleObject.get("skillName").getAsString());
				counting++;
				}catch(Exception e) {
					LOG.info("Error: cannot add a record");
				}
			}
			LOG.info("Done.."+counting+" skill/s added");
		}
		
		if(request.equals("delete")) {
			
			 int counting = 0;
			LOG.info("adding skills");
		
			for(JsonElement element : jsonArray) {
				JsonObject singleObject = element.getAsJsonObject();
				skillsdata.deleteSkill(singleObject.get("skillId").getAsInt(), singleObject.get("skillName").getAsString());
				counting++;
			}
			LOG.info("Done.."+counting+" skill/s removed");
		}


}
	
	
	
	@JmsListener(destination = "${SQS_ENDPOINT}",containerFactory = "jmsListenerContainerFactory")
	public void receive(@Payload String message) {
		try {
			JsonObject jsonObject = new JsonParser().parse(message).getAsJsonObject();
			String type = jsonObject.get("objectType").getAsString();
			String request = jsonObject.get("requestType").getAsString();
			JsonArray value = jsonObject.get("values").getAsJsonArray();
			switch (type.toUpperCase()) {
			  case "BATCH":
				  	handleBatch(value,request);
			    break;
			  case "ASSOCIATE":
				    handleAssociate(value,request);
			    break;
			  case "SKILL":
				    handleSkill(value,request);
				break;
			  default:
			    LOG.info("No match!");
			}

		}catch(Exception e) {
			LOG.info("Error: "+e.getMessage());
		}
	}
	     
}
	
	
	
	
	
	
	