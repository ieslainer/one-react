exports.getById = function(req, res, next){
       console.log("AssessmentController -> getById");
       console.log("Req ->", req.params.id);
       var response = {};  
       response['ESC_CA17_OPT_G06U01L00_000'] = {"headerInformation":{
                              "resourceId" : "ESC_CA17_OPT_G06U01L00_000",
                              "assessment": "Online Pretest: Unit 1",
                              "id":null,
                              "headers":[{
                                "grade" : "ALL",
                                "level" : null,
                                "districtRefId" : "c1fbd79b-ddba-4f0d-9af1-825990d9a8e5",
                                "districtName" : "Gilmartin Test District",
                                "schoolRefId": null,
                                "schoolName": "2",
                                "schoolsTotal": 2,
                                "schoolsIncluded": 2,
                                "classRefId":null,
                                "className":"7",
                                "classesTotal":7,
                                "classesIncluded":7,
                                "teacherGivenName":null,
                                "teacherFamilyName":null,
                                "teacherMiddleName":null
                              }]
                          }
                        };
        response['ESC_CA17_OPT_G08U02L00_000'] = {"headerInformation":{
                              "resourceId" : "ESC_CA17_OPT_G08U02L00_000",
                              "assessment": "Online Pretest: Unit 2",
                              "id":null,
                              "headers":[{
                                "grade" : "ALL",
                                "level" : null,
                                "districtRefId" : "c1fbd79b-ddba-4f0d-9af1-825990d9a8e5",
                                "districtName" : "Gilmartin Test District 2",
                                "schoolRefId": null,
                                "schoolName": "2",
                                "schoolsTotal": 2,
                                "schoolsIncluded": 2,
                                "classRefId":null,
                                "className":"7",
                                "classesTotal":7,
                                "classesIncluded":7,
                                "teacherGivenName":"Rosheen MeandererHMOF",
                                "teacherFamilyName":"Rosheen MeandererHMOF",
                                "teacherMiddleName":"Rosheen MeandererHMOF"
                              }]

                        } };
                        
          response['LTCA17_G06C00L00_OA_038'] ={
                          "headerInformation":{
                                "resourceId" : "LTCA17_G06C00L00_OA_038",
                                "assessment": "Grade 6 CAASPP ELA Practice Test 1",
                                "id":null,
                                "headers":[{
                                  "grade" : "ALL",
                                  "level" : null,
                                  "districtRefId" : "c1fbd79b-ddba-4f0d-9af1-825990d9a8e5",
                                  "districtName" : "Gilmartin Test District 2",
                                  "schoolRefId": null,
                                  "schoolName": "2",
                                  "schoolsTotal": 2,
                                  "schoolsIncluded": 2,
                                  "classRefId":null,
                                  "className":"7",
                                  "classesTotal":7,
                                  "classesIncluded":7,
                                  "teacherGivenName":"John Luck",
                                  "teacherFamilyName":"John Luck",
                                  "teacherMiddleName":"John Luck"
                                }]
  
                          }
                        };
       res.send(response[req.params.id]);
}

    