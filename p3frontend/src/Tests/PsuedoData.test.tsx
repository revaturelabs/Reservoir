import React from 'react';
import {pseudoDataResponse} from "../PseudoData(don't-delete)/convertJsonToObjects"

describe("test pseudodata", () =>{
    
    
    test("checks pseudodata equality", () =>{
      expect(pseudoDataResponse).toStrictEqual({"data": [
        {
            "batchId": 1,
            "startDate": "2020-05-04",
            "endDate": "2020-07-10",
            "isConfirmed": true,
            "interviewScoreLower": 80,
            "trainers": [
                {
                    "trainerId": 2,
                    "firstName": "andrew",
                    "lastName": "crenladge",
                    "email": "andrew@revature.com",
                    "isEligible": false
                }
            ],
            "location": {
                "locationId": 1,
                "locationName": "Reston"
            },
            "curriculum": {
                "curriculumId": 1,
                "name": "curriculum1",
                "curriculumSkillset": {
                    "skillSetId": 1,
                    "skillSetName": "Java + React",
                    "skills": [
                        {
                            "skillId": 1,
                            "skillName": "JavaScript"
                        },
                        {
                            "skillId": 2,
                            "skillName": "React"
                        },
                        {
                            "skillId": 3,
                            "skillName": "Java"
                        },
                        {
                            "skillId": 4,
                            "skillName": "TypeScript"
                        }
                    ],
                    "trainers": [],
                    "clientDemands": [
                        {
                            "clientDemandId": 1
                        },
                        {
                            "clientDemandId": 9
                        },
                        {
                            "clientDemandId": 14
                        }
                    ]
                }
            },
            "associates": [
                {
                    "associateId": 554,
                    "firstName": "Gloria",
                    "lastName": "Beccles",
                    "email": "gbecclesfc@smugmug.com",
                    "active": true,
                    "interviewScore": 93.25
                },
                {
                    "associateId": 968,
                    "firstName": "Will",
                    "lastName": "Swales",
                    "email": "wswalesqu@jiathis.com",
                    "active": true,
                    "interviewScore": 78.75
                }
            ],
            "programType": "Standard"
        },
        {
            "batchId": 2,
            "startDate": "2020-05-13",
            "endDate": "2020-07-22",
            "isConfirmed": true,
            "interviewScoreLower": 80,
            "trainers": [
                {
                    "trainerId": 1,
                    "firstName": "adam",
                    "lastName": "king",
                    "email": "adamking@revature.com",
                    "isEligible": false
                }
            ],
            "location": {
                "locationId": 2,
                "locationName": "Arlington"
            },
            "curriculum": {
                "curriculumId": 2,
                "name": "curriculum2",
                "curriculumSkillset": {
                    "skillSetId": 2,
                    "skillSetName": "Full Stack Java + Microservices",
                    "skills": [
                        {
                            "skillId": 3,
                            "skillName": "Java"
                        },
                        {
                            "skillId": 5,
                            "skillName": "Spring"
                        },
                        {
                            "skillId": 6,
                            "skillName": "Maven"
                        },
                        {
                            "skillId": 8,
                            "skillName": "Microservices"
                        },
                        {
                            "skillId": 13,
                            "skillName": "Salesforce"
                        }
                    ],
                    "trainers": [
                        {
                            "trainerId": 1,
                            "isEligible": false
                        }
                    ],
                    "clientDemands": [
                        {
                            "clientDemandId": 4
                        },
                        {
                            "clientDemandId": 7
                        }
                    ]
                }
            },
            "associates": [
                {
                    "associateId": 1,
                    "firstName": "Jimothy",
                    "lastName": "Bupkins",
                    "email": "jbupkins@jim.bup",
                    "active": true,
                    "interviewScore": 25
                },
                {
                    "associateId": 260,
                    "firstName": "Abelard",
                    "lastName": "Heakins",
                    "email": "aheakins76@oakley.com",
                    "active": true,
                    "interviewScore": 91.5
                },
                {
                    "associateId": 334,
                    "firstName": "Rodrick",
                    "lastName": "Potkins",
                    "email": "rpotkins98@merriam-webster.com",
                    "active": true,
                    "interviewScore": 82.5
                }
            ],
            "programType": "Standard"
        },
        {
            "batchId": 3,
            "startDate": "2020-05-27",
            "endDate": "2020-08-05",
            "isConfirmed": true,
            "interviewScoreLower": 70,
            "trainers": [
                {
                    "trainerId": 3,
                    "firstName": "steven",
                    "lastName": "john",
                    "email": "stevenJ@revature.com",
                    "isEligible": false
                }
            ],
            "location": {
                "locationId": 3,
                "locationName": "Tampa"
            },
            "curriculum": {
                "curriculumId": 3,
                "name": "curriculum3",
                "curriculumSkillset": {
                    "skillSetId": 3,
                    "skillSetName": "Salesforce",
                    "skills": [
                        {
                            "skillId": 26,
                            "skillName": "SOAP"
                        }
                    ],
                    "trainers": [
                        {
                            "trainerId": 2,
                            "isEligible": false
                        }
                    ],
                    "clientDemands": [
                        {
                            "clientDemandId": 12
                        },
                        {
                            "clientDemandId": 13
                        }
                    ]
                }
            },
            "associates": [
                {
                    "associateId": 27,
                    "firstName": "Thomasin",
                    "lastName": "Broomhead",
                    "email": "tbroomheadp@twitpic.com",
                    "active": true,
                    "interviewScore": 62.5
                },
                {
                    "associateId": 81,
                    "firstName": "Bibbye",
                    "lastName": "Rookeby",
                    "email": "brookeby27@fda.gov",
                    "active": true,
                    "interviewScore": 47.75
                },
                {
                    "associateId": 114,
                    "firstName": "Lorilyn",
                    "lastName": "Good",
                    "email": "lgood34@ihg.com",
                    "active": true,
                    "interviewScore": 95
                },
                {
                    "associateId": 127,
                    "firstName": "Kirbie",
                    "lastName": "Goodding",
                    "email": "kgoodding3h@simplemachines.org",
                    "active": true,
                    "interviewScore": 32.75
                },
                {
                    "associateId": 138,
                    "firstName": "Nelia",
                    "lastName": "Stangroom",
                    "email": "nstangroom3s@usa.gov",
                    "active": true,
                    "interviewScore": 48.5
                },
                {
                    "associateId": 194,
                    "firstName": "Adham",
                    "lastName": "Raywood",
                    "email": "araywood5c@tinypic.com",
                    "active": true,
                    "interviewScore": 92.75
                },
                {
                    "associateId": 198,
                    "firstName": "Thurston",
                    "lastName": "Corwood",
                    "email": "tcorwood5g@tamu.edu",
                    "active": true,
                    "interviewScore": 29
                },
                {
                    "associateId": 219,
                    "firstName": "Dermot",
                    "lastName": "Gilhool",
                    "email": "dgilhool61@gnu.org",
                    "active": true,
                    "interviewScore": 93.25
                },
                {
                    "associateId": 297,
                    "firstName": "Jake",
                    "lastName": "Sanbrooke",
                    "email": "jsanbrooke87@google.com.br",
                    "active": true,
                    "interviewScore": 78
                },
                {
                    "associateId": 351,
                    "firstName": "Humberto",
                    "lastName": "Koop",
                    "email": "hkoop9p@wufoo.com",
                    "active": true,
                    "interviewScore": 1
                },
                {
                    "associateId": 404,
                    "firstName": "Dru",
                    "lastName": "Roome",
                    "email": "droomeb6@npr.org",
                    "active": true,
                    "interviewScore": 17.5
                },
                {
                    "associateId": 462,
                    "firstName": "Josee",
                    "lastName": "Shambrooke",
                    "email": "jshambrookecs@google.nl",
                    "active": true,
                    "interviewScore": 81.25
                },
                {
                    "associateId": 469,
                    "firstName": "Dominga",
                    "lastName": "Lightwood",
                    "email": "dlightwoodcz@omniture.com",
                    "active": true,
                    "interviewScore": 41.5
                },
                {
                    "associateId": 616,
                    "firstName": "Josepha",
                    "lastName": "Charlewood",
                    "email": "jcharlewoodh2@livejournal.com",
                    "active": true,
                    "interviewScore": 16
                },
                {
                    "associateId": 635,
                    "firstName": "Lorenza",
                    "lastName": "Atwool",
                    "email": "latwoolhl@xing.com",
                    "active": true,
                    "interviewScore": 32
                },
                {
                    "associateId": 714,
                    "firstName": "Karee",
                    "lastName": "Shooter",
                    "email": "kshooterjs@youtu.be",
                    "active": true,
                    "interviewScore": 97.5
                },
                {
                    "associateId": 716,
                    "firstName": "Delilah",
                    "lastName": "Goodday",
                    "email": "dgooddayju@prlog.org",
                    "active": true,
                    "interviewScore": 88.5
                },
                {
                    "associateId": 729,
                    "firstName": "Meir",
                    "lastName": "Smidmoor",
                    "email": "msmidmoork7@quantcast.com",
                    "active": true,
                    "interviewScore": 54
                },
                {
                    "associateId": 730,
                    "firstName": "Klarika",
                    "lastName": "Fulbrook",
                    "email": "kfulbrookk8@berkeley.edu",
                    "active": true,
                    "interviewScore": 29.25
                },
                {
                    "associateId": 762,
                    "firstName": "Rudolph",
                    "lastName": "Wooler",
                    "email": "rwoolerl4@pcworld.com",
                    "active": true,
                    "interviewScore": 42.75
                },
                {
                    "associateId": 806,
                    "firstName": "Em",
                    "lastName": "Hagwood",
                    "email": "ehagwoodmc@linkedin.com",
                    "active": true,
                    "interviewScore": 59.5
                },
                {
                    "associateId": 821,
                    "firstName": "Ferne",
                    "lastName": "Ridewood",
                    "email": "fridewoodmr@netlog.com",
                    "active": true,
                    "interviewScore": 74
                },
                {
                    "associateId": 828,
                    "firstName": "Slade",
                    "lastName": "Merwood",
                    "email": "smerwoodmy@elegantthemes.com",
                    "active": true,
                    "interviewScore": 55.25
                },
                {
                    "associateId": 846,
                    "firstName": "Sharlene",
                    "lastName": "Woodger",
                    "email": "swoodgerng@netscape.com",
                    "active": true,
                    "interviewScore": 39.75
                },
                {
                    "associateId": 869,
                    "firstName": "Trevor",
                    "lastName": "Toogood",
                    "email": "ttoogoodo3@behance.net",
                    "active": true,
                    "interviewScore": 68
                },
                {
                    "associateId": 952,
                    "firstName": "Viola",
                    "lastName": "Moorfield",
                    "email": "vmoorfieldqe@weibo.com",
                    "active": true,
                    "interviewScore": 14.75
                },
                {
                    "associateId": 986,
                    "firstName": "Chancey",
                    "lastName": "Trood",
                    "email": "ctroodrc@omniture.com",
                    "active": true,
                    "interviewScore": 74.5
                },
                {
                    "associateId": 998,
                    "firstName": "Thomasina",
                    "lastName": "Falloon",
                    "email": "tfalloonro@oakley.com",
                    "active": true,
                    "interviewScore": 11.25
                }
            ],
            "programType": "Spark"
        },
        {
            "batchId": 4,
            "startDate": "2020-06-17",
            "endDate": "2020-08-26",
            "isConfirmed": false,
            "interviewScoreLower": 70,
            "trainers": [
                {
                    "trainerId": 4,
                    "firstName": "john",
                    "lastName": "james",
                    "email": "john@revature.com",
                    "isEligible": false
                },
                {
                    "trainerId": 5,
                    "firstName": "lisa",
                    "lastName": "jose",
                    "email": "lisa@revature.com",
                    "isEligible": false
                }
            ],
            "location": {
                "locationId": 4,
                "locationName": "New York City"
            },
            "curriculum": {
                "curriculumId": 4,
                "name": "curriculum4",
                "curriculumSkillset": {
                    "skillSetId": 4,
                    "skillSetName": "Cloud Technologies",
                    "skills": [
                        {
                            "skillId": 3,
                            "skillName": "Java"
                        },
                        {
                            "skillId": 5,
                            "skillName": "Spring"
                        },
                        {
                            "skillId": 8,
                            "skillName": "Microservices"
                        },
                        {
                            "skillId": 9,
                            "skillName": "Hibernate"
                        },
                        {
                            "skillId": 38,
                            "skillName": "SOAP UI"
                        }
                    ],
                    "trainers": [],
                    "clientDemands": [
                        {
                            "clientDemandId": 2
                        }
                    ]
                }
            },
            "associates": [
                {
                    "associateId": 174,
                    "firstName": "Lanae",
                    "lastName": "Crown",
                    "email": "lcrown4s@cocolog-nifty.com",
                    "active": true,
                    "interviewScore": 25
                },
                {
                    "associateId": 239,
                    "firstName": "Vittoria",
                    "lastName": "Brown",
                    "email": "vbrown6l@wufoo.com",
                    "active": true,
                    "interviewScore": 71.5
                },
                {
                    "associateId": 859,
                    "firstName": "Gusty",
                    "lastName": "Downse",
                    "email": "gdownsent@bloglines.com",
                    "active": true,
                    "interviewScore": 75.5
                }
            ],
            "programType": "Standard"
        },
        {
            "batchId": 5,
            "startDate": "2020-04-29",
            "endDate": "2020-07-08",
            "isConfirmed": true,
            "interviewScoreLower": 90,
            "trainers": [],
            "location": {
                "locationId": 5,
                "locationName": "Morgantown"
            },
            "curriculum": {
                "curriculumId": 1,
                "name": "curriculum1",
                "curriculumSkillset": {
                    "skillSetId": 1,
                    "skillSetName": "Java + React",
                    "skills": [
                        {
                            "skillId": 1,
                            "skillName": "JavaScript"
                        },
                        {
                            "skillId": 2,
                            "skillName": "React"
                        },
                        {
                            "skillId": 3,
                            "skillName": "Java"
                        },
                        {
                            "skillId": 4,
                            "skillName": "TypeScript"
                        }
                    ],
                    "trainers": [],
                    "clientDemands": [
                        {
                            "clientDemandId": 1
                        },
                        {
                            "clientDemandId": 9
                        },
                        {
                            "clientDemandId": 14
                        }
                    ]
                }
            },
            "associates": [
                {
                    "associateId": 2,
                    "firstName": "Cherida",
                    "lastName": "Thing",
                    "email": "cthing0@jimdo.com",
                    "active": true,
                    "interviewScore": 73.25
                },
                {
                    "associateId": 17,
                    "firstName": "Clevie",
                    "lastName": "Baysting",
                    "email": "cbaystingf@tmall.com",
                    "active": true,
                    "interviewScore": 87.25
                },
                {
                    "associateId": 26,
                    "firstName": "Reiko",
                    "lastName": "Jopling",
                    "email": "rjoplingo@tuttocitta.it",
                    "active": true,
                    "interviewScore": 81.5
                },
                {
                    "associateId": 28,
                    "firstName": "Carlos",
                    "lastName": "Mayling",
                    "email": "cmaylingq@people.com.cn",
                    "active": true,
                    "interviewScore": 47.5
                },
                {
                    "associateId": 158,
                    "firstName": "Rosabella",
                    "lastName": "Coling",
                    "email": "rcoling4c@usa.gov",
                    "active": true,
                    "interviewScore": 48
                },
                {
                    "associateId": 215,
                    "firstName": "Birch",
                    "lastName": "Pipping",
                    "email": "bpipping5x@bing.com",
                    "active": true,
                    "interviewScore": 3.5
                },
                {
                    "associateId": 242,
                    "firstName": "Rowney",
                    "lastName": "Dobing",
                    "email": "rdobing6o@noaa.gov",
                    "active": true,
                    "interviewScore": 73.75
                },
                {
                    "associateId": 293,
                    "firstName": "Ellissa",
                    "lastName": "Geerling",
                    "email": "egeerling83@aol.com",
                    "active": true,
                    "interviewScore": 96
                },
                {
                    "associateId": 328,
                    "firstName": "Norman",
                    "lastName": "Ganning",
                    "email": "nganning92@marriott.com",
                    "active": true,
                    "interviewScore": 76.25
                },
                {
                    "associateId": 397,
                    "firstName": "Karoly",
                    "lastName": "Baysting",
                    "email": "kbaystingaz@artisteer.com",
                    "active": true,
                    "interviewScore": 23.25
                },
                {
                    "associateId": 438,
                    "firstName": "Liz",
                    "lastName": "Aveling",
                    "email": "lavelingc4@europa.eu",
                    "active": true,
                    "interviewScore": 36.5
                },
                {
                    "associateId": 584,
                    "firstName": "Deeanne",
                    "lastName": "Slimming",
                    "email": "dslimmingg6@google.com.au",
                    "active": true,
                    "interviewScore": 7
                },
                {
                    "associateId": 597,
                    "firstName": "Gaylor",
                    "lastName": "Skilling",
                    "email": "gskillinggj@globo.com",
                    "active": true,
                    "interviewScore": 24.5
                },
                {
                    "associateId": 750,
                    "firstName": "Archambault",
                    "lastName": "Dulling",
                    "email": "adullingks@tuttocitta.it",
                    "active": true,
                    "interviewScore": 68
                },
                {
                    "associateId": 853,
                    "firstName": "Woodman",
                    "lastName": "Golding",
                    "email": "wgoldingnn@indiatimes.com",
                    "active": true,
                    "interviewScore": 86.5
                },
                {
                    "associateId": 981,
                    "firstName": "Grant",
                    "lastName": "Balling",
                    "email": "gballingr7@reuters.com",
                    "active": true,
                    "interviewScore": 40.75
                }
            ],
            "programType": "ROCP"
        },
        {
            "batchId": 6,
            "startDate": "2020-04-20",
            "endDate": "2020-07-05",
            "isConfirmed": true,
            "interviewScoreLower": 70,
            "trainers": [],
            "location": {
                "locationId": 5,
                "locationName": "Morgantown"
            },
            "curriculum": {
                "curriculumId": 1,
                "name": "curriculum1",
                "curriculumSkillset": {
                    "skillSetId": 1,
                    "skillSetName": "Java + React",
                    "skills": [
                        {
                            "skillId": 1,
                            "skillName": "JavaScript"
                        },
                        {
                            "skillId": 2,
                            "skillName": "React"
                        },
                        {
                            "skillId": 3,
                            "skillName": "Java"
                        },
                        {
                            "skillId": 4,
                            "skillName": "TypeScript"
                        }
                    ],
                    "trainers": [],
                    "clientDemands": [
                        {
                            "clientDemandId": 1
                        },
                        {
                            "clientDemandId": 9
                        },
                        {
                            "clientDemandId": 14
                        }
                    ]
                }
            },
            "associates": [
                {
                    "associateId": 57,
                    "firstName": "Ailene",
                    "lastName": "Chesterman",
                    "email": "achesterman1j@uiuc.edu",
                    "active": true,
                    "interviewScore": 37
                },
                {
                    "associateId": 64,
                    "firstName": "Leila",
                    "lastName": "Langman",
                    "email": "llangman1q@cpanel.net",
                    "active": true,
                    "interviewScore": 41.5
                },
                {
                    "associateId": 117,
                    "firstName": "Rianon",
                    "lastName": "Sausman",
                    "email": "rsausman37@networksolutions.com",
                    "active": true,
                    "interviewScore": 85.25
                },
                {
                    "associateId": 159,
                    "firstName": "Jeri",
                    "lastName": "Yeoman",
                    "email": "jyeoman4d@ihg.com",
                    "active": true,
                    "interviewScore": 45.75
                },
                {
                    "associateId": 218,
                    "firstName": "Danette",
                    "lastName": "Betjeman",
                    "email": "dbetjeman60@home.pl",
                    "active": true,
                    "interviewScore": 97.75
                },
                {
                    "associateId": 225,
                    "firstName": "Vallie",
                    "lastName": "Sausman",
                    "email": "vsausman67@businessweek.com",
                    "active": true,
                    "interviewScore": 16
                },
                {
                    "associateId": 256,
                    "firstName": "Mack",
                    "lastName": "Chartman",
                    "email": "mchartman72@tiny.cc",
                    "active": true,
                    "interviewScore": 49.5
                },
                {
                    "associateId": 273,
                    "firstName": "Claybourne",
                    "lastName": "Worman",
                    "email": "cworman7j@state.gov",
                    "active": true,
                    "interviewScore": 69.25
                },
                {
                    "associateId": 322,
                    "firstName": "Ilario",
                    "lastName": "Batman",
                    "email": "ibatman8w@nytimes.com",
                    "active": true,
                    "interviewScore": 57
                },
                {
                    "associateId": 344,
                    "firstName": "Rudolph",
                    "lastName": "Smalman",
                    "email": "rsmalman9i@dedecms.com",
                    "active": true,
                    "interviewScore": 59.25
                },
                {
                    "associateId": 381,
                    "firstName": "Rozella",
                    "lastName": "Courtman",
                    "email": "rcourtmanaj@sfgate.com",
                    "active": true,
                    "interviewScore": 56.25
                },
                {
                    "associateId": 388,
                    "firstName": "Ali",
                    "lastName": "Passman",
                    "email": "apassmanaq@sina.com.cn",
                    "active": true,
                    "interviewScore": 69.75
                },
                {
                    "associateId": 423,
                    "firstName": "Wilma",
                    "lastName": "Tireman",
                    "email": "wtiremanbp@nyu.edu",
                    "active": true,
                    "interviewScore": 48.5
                },
                {
                    "associateId": 481,
                    "firstName": "Syd",
                    "lastName": "Tydeman",
                    "email": "stydemandb@taobao.com",
                    "active": true,
                    "interviewScore": 99.75
                },
                {
                    "associateId": 563,
                    "firstName": "Carling",
                    "lastName": "Seman",
                    "email": "csemanfl@delicious.com",
                    "active": true,
                    "interviewScore": 92
                },
                {
                    "associateId": 573,
                    "firstName": "Kayle",
                    "lastName": "Gilman",
                    "email": "kgilmanfv@addtoany.com",
                    "active": true,
                    "interviewScore": 97.5
                },
                {
                    "associateId": 582,
                    "firstName": "Emelda",
                    "lastName": "Lawman",
                    "email": "elawmang4@wordpress.com",
                    "active": true,
                    "interviewScore": 95.75
                },
                {
                    "associateId": 613,
                    "firstName": "Lindsey",
                    "lastName": "Kingman",
                    "email": "lkingmangz@admin.ch",
                    "active": true,
                    "interviewScore": 26.25
                },
                {
                    "associateId": 634,
                    "firstName": "Brewer",
                    "lastName": "Peatman",
                    "email": "bpeatmanhk@sbwire.com",
                    "active": true,
                    "interviewScore": 53.75
                },
                {
                    "associateId": 654,
                    "firstName": "Adolf",
                    "lastName": "Speakman",
                    "email": "aspeakmani4@abc.net.au",
                    "active": true,
                    "interviewScore": 46.75
                },
                {
                    "associateId": 814,
                    "firstName": "Kristopher",
                    "lastName": "Parkman",
                    "email": "kparkmanmk@newsvine.com",
                    "active": true,
                    "interviewScore": 77.75
                },
                {
                    "associateId": 910,
                    "firstName": "Goldi",
                    "lastName": "Easeman",
                    "email": "geasemanp8@ihg.com",
                    "active": true,
                    "interviewScore": 83.25
                },
                {
                    "associateId": 976,
                    "firstName": "Portia",
                    "lastName": "Harman",
                    "email": "pharmanr2@nytimes.com",
                    "active": true,
                    "interviewScore": 83
                },
                {
                    "associateId": 994,
                    "firstName": "Antonella",
                    "lastName": "Whitman",
                    "email": "awhitmanrk@hugedomains.com",
                    "active": true,
                    "interviewScore": 16.75
                }
            ],
            "programType": "ROCP"
        },
        {
            "batchId": 7,
            "startDate": "2020-03-20",
            "endDate": "2020-05-05",
            "isConfirmed": true,
            "interviewScoreLower": 70,
            "trainers": [],
            "location": {
                "locationId": 5,
                "locationName": "Morgantown"
            },
            "curriculum": {
                "curriculumId": 1,
                "name": "curriculum1",
                "curriculumSkillset": {
                    "skillSetId": 1,
                    "skillSetName": "Java + React",
                    "skills": [
                        {
                            "skillId": 1,
                            "skillName": "JavaScript"
                        },
                        {
                            "skillId": 2,
                            "skillName": "React"
                        },
                        {
                            "skillId": 3,
                            "skillName": "Java"
                        },
                        {
                            "skillId": 4,
                            "skillName": "TypeScript"
                        }
                    ],
                    "trainers": [],
                    "clientDemands": [
                        {
                            "clientDemandId": 1
                        },
                        {
                            "clientDemandId": 9
                        },
                        {
                            "clientDemandId": 14
                        }
                    ]
                }
            },
            "associates": [],
            "programType": "Standard"
        },
        {
            "batchId": 8,
            "startDate": "2020-01-20",
            "endDate": "2020-03-05",
            "isConfirmed": true,
            "interviewScoreLower": 70,
            "trainers": [],
            "location": {
                "locationId": 5,
                "locationName": "Morgantown"
            },
            "curriculum": {
                "curriculumId": 1,
                "name": "curriculum1",
                "curriculumSkillset": {
                    "skillSetId": 1,
                    "skillSetName": "Java + React",
                    "skills": [
                        {
                            "skillId": 1,
                            "skillName": "JavaScript"
                        },
                        {
                            "skillId": 2,
                            "skillName": "React"
                        },
                        {
                            "skillId": 3,
                            "skillName": "Java"
                        },
                        {
                            "skillId": 4,
                            "skillName": "TypeScript"
                        }
                    ],
                    "trainers": [],
                    "clientDemands": [
                        {
                            "clientDemandId": 1
                        },
                        {
                            "clientDemandId": 9
                        },
                        {
                            "clientDemandId": 14
                        }
                    ]
                }
            },
            "associates": [],
            "programType": "Spark"
        },
        {
            "batchId": 9,
            "startDate": "2020-06-10",
            "endDate": "2020-08-19",
            "isConfirmed": false,
            "interviewScoreLower": 80,
            "trainers": [],
            "location": {
                "locationId": 1,
                "locationName": "Reston"
            },
            "curriculum": {
                "curriculumId": 4,
                "name": "curriculum4",
                "curriculumSkillset": {
                    "skillSetId": 4,
                    "skillSetName": "Cloud Technologies",
                    "skills": [
                        {
                            "skillId": 3,
                            "skillName": "Java"
                        },
                        {
                            "skillId": 5,
                            "skillName": "Spring"
                        },
                        {
                            "skillId": 8,
                            "skillName": "Microservices"
                        },
                        {
                            "skillId": 9,
                            "skillName": "Hibernate"
                        },
                        {
                            "skillId": 38,
                            "skillName": "SOAP UI"
                        }
                    ],
                    "trainers": [],
                    "clientDemands": [
                        {
                            "clientDemandId": 2
                        }
                    ]
                }
            },
            "associates": [],
            "programType": "CF"
        }
    ]
    });
    })

  });