<?php
const DUMMY = '{
    "profile": {
      "name": "Profile",
      "id": "profile",
      "sub_groups": {
        "basic_info": {
          "id": "basic_info",
          "name": "Basic Information",
          "is_multiple_entries": 0,
          "data": [
            {
              "primary_key": 38
              "field_id": "lname",
              "group_id": "profile",
              "is_for_approval": 1,
              "descript": "Last name",
              "table_name": "emp",
              "field_name": "lname",
              "is_multiple_entries": 0,
              "data_type": "text",
              "sub_group_id": "basic_info",
              "group_name": "Profile",
              "sub_group_name": "Basic Information",
              "attachments": [
                {
                  "descript": "PSA Birth Certificate",
                  "attachment_id": "psa"
                }
              ],
              "data": "CARREON"
            },
            {
              "primary_key": 4,
              "field_id": "nname",
              "group_id": "profile",
              "is_for_approval": 1,
              "descript": "Nickname",
              "table_name": "emp",
              "field_name": "nname",
              "is_multiple_entries": 0,
              "data_type": "text",
              "sub_group_id": "basic_info",
              "group_name": "Profile",
              "sub_group_name": "Basic Information",
              "attachments": [
                {
                  "descript": "PSA Birth Certificate",
                  "attachment_id": "psa"
                }
              ],
              "data": "GAB"
            },
            {
              "primary_key": 2,
              "field_id": "nsuffix",
              "group_id": "profile",
              "is_for_approval": 1,
              "descript": "Suffix",
              "table_name": "emp",
              "field_name": "nsuffix",
              "is_multiple_entries": 0,
              "data_type": "text",
              "sub_group_id": "basic_info",
              "group_name": "Profile",
              "sub_group_name": "Basic Information",
              "attachments": [
                {
                  "descript": "PSA Birth Certificate",
                  "attachment_id": "psa"
                }
              ],
              "data": ""
            }
          ]
        },
        "personal_info": {
          "id": "personal_info",
          "name": "Personal Information",
          "is_multiple_entries": 0,
          "data": [
            {
              "primary_key": 11,
              "field_id": "bdate",
              "group_id": "profile",
              "is_for_approval": 1,
              "descript": "Birth date",
              "table_name": "emp",
              "field_name": "bdate",
              "is_multiple_entries": 0,
              "data_type": "date",
              "sub_group_id": "personal_info",
              "group_name": "Profile",
              "sub_group_name": "Personal Information",
              "attachments": [
                {
                  "descript": "PSA Birth Certificate",
                  "attachment_id": "psa"
                }
              ],
              "data": "26/07/2000"
            },
            {
              "primary_key": 12,
              "field_id": "bplace",
              "group_id": "profile",
              "is_for_approval": 1,
              "descript": "Birth place",
              "table_name": "emp",
              "field_name": "bplace",
              "is_multiple_entries": 0,
              "data_type": "text",
              "sub_group_id": "personal_info",
              "group_name": "Profile",
              "sub_group_name": "Personal Information",
              "attachments": [
                {
                  "descript": "PSA Birth Certificate",
                  "attachment_id": "psa"
                }
              ],
              "data": "LAS PINAS CITY, METRO MANILA"
            },
            {
              "primary_key": 7,
              "field_id": "cstatus",
              "group_id": "profile",
              "is_for_approval": 1,
              "descript": "Civil Status",
              "table_name": "emp",
              "field_name": "cstatus",
              "is_multiple_entries": 0,
              "data_type": "select|[\r\n    {\r\n      \"label\": \"Annulled\",\r\n      \"value\": \"ANNULLLED\"\r\n    },\r\n    {\r\n      \"label\": \"Legally Separated\",\r\n      \"value\": \"LEGALLY SEPARATED\"\r\n    },\r\n    {\r\n      \"label\": \"Married\",\r\n      \"value\": \"MARRIED\"\r\n    },\r\n    {\r\n      \"label\": \"Separated\",\r\n      \"value\": \"SEPARATED\"\r\n    },\r\n    {\r\n      \"label\": \"Single\",\r\n      \"value\": \"SINGLE\"\r\n    },\r\n    {\r\n      \"label\": \"Widowed\",\r\n      \"value\": \"WIDOWED\"\r\n    }\r\n  ]",
              "sub_group_id": "personal_info",
              "group_name": "Profile",
              "sub_group_name": "Personal Information",
              "attachments": [
                {
                  "descript": "Marriage Contract",
                  "attachment_id": "marriage_contract"
                }
              ],
              "data": "SINGLE"
            },
            {
              "primary_key": 5,
              "field_id": "sex",
              "group_id": "profile",
              "is_for_approval": 1,
              "descript": "Gender",
              "table_name": "emp",
              "field_name": "sex",
              "is_multiple_entries": 0,
              "data_type": "select|[\r\n   {\r\n     \"label\": \"Male\",\r\n     \"value\": \"MALE\"\r\n   },\r\n   {\r\n     \"label\": \"Female\",\r\n     \"value\": \"FEMALE\"\r\n   }\r\n ]",
              "sub_group_id": "personal_info",
              "group_name": "Profile",
              "sub_group_name": "Personal Information",
              "attachments": [
                {
                  "descript": "PSA Birth Certificate",
                  "attachment_id": "psa"
                }
              ],
              "data": "MALE"
            },
            {
              "primary_key": 16,
              "field_id": "height",
              "group_id": "profile",
              "is_for_approval": 0,
              "descript": "Height",
              "table_name": "emp",
              "field_name": "height",
              "is_multiple_entries": 0,
              "data_type": "text",
              "sub_group_id": "personal_info",
              "group_name": "Profile",
              "sub_group_name": "Personal Information",
              "attachments": [],
              "data": ""
            },
            {
              "primary_key": 13,
              "field_id": "dialect",
              "group_id": "profile",
              "is_for_approval": 0,
              "descript": "Languages & dialects",
              "table_name": "emp",
              "field_name": "dialect",
              "is_multiple_entries": 0,
              "data_type": "text",
              "sub_group_id": "personal_info",
              "group_name": "Profile",
              "sub_group_name": "Personal Information",
              "attachments": [],
              "data": "ENGLISH, FILIPINO"
            },
            {
              "primary_key": 8,
              "field_id": "nationality",
              "group_id": "profile",
              "is_for_approval": 0,
              "descript": "Nationality",
              "table_name": "emp",
              "field_name": "nationality",
              "is_multiple_entries": 0,
              "data_type": "text",
              "sub_group_id": "personal_info",
              "group_name": "Profile",
              "sub_group_name": "Personal Information",
              "attachments": [],
              "data": "FILIPINO"
            },
            {
              "primary_key": 21,
              "field_id": "pagibigno",
              "group_id": "profile",
              "is_for_approval": 1,
              "descript": "Pag-ibig No",
              "table_name": "emp",
              "field_name": "pagibigno",
              "is_multiple_entries": 0,
              "data_type": "text",
              "sub_group_id": "personal_info",
              "group_name": "Profile",
              "sub_group_name": "Personal Information",
              "attachments": [
                {
                  "descript": "Pag-ibig ID",
                  "attachment_id": "pagibig_id"
                }
              ],
              "data": "121-302-072-118"
            },
            {
              "primary_key": 20,
              "field_id": "phealthno",
              "group_id": "profile",
              "is_for_approval": 1,
              "descript": "Philhealth No",
              "table_name": "emp",
              "field_name": "phealthno",
              "is_multiple_entries": 0,
              "data_type": "text",
              "sub_group_id": "personal_info",
              "group_name": "Profile",
              "sub_group_name": "Personal Information",
              "attachments": [
                {
                  "descript": "Philhealth ID",
                  "attachment_id": "philhealth_id"
                }
              ],
              "data": "072-527-704-392"
            },
            {
              "primary_key": 9,
              "field_id": "addpresent",
              "group_id": "profile",
              "is_for_approval": 0,
              "descript": "Present address",
              "table_name": "emp",
              "field_name": "addpresent",
              "is_multiple_entries": 0,
              "data_type": "text",
              "sub_group_id": "personal_info",
              "group_name": "Profile",
              "sub_group_name": "Personal Information",
              "attachments": [],
              "data": "BLOCK 6 LOT 15 TAAL ST. BERMUDA COUNTRY SUBDIVISION, PAMPLONA UNO LAS PINAS CITY"
            },
            {
              "primary_key": 10,
              "field_id": "addprovincial",
              "group_id": "profile",
              "is_for_approval": 0,
              "descript": "Provincial address",
              "table_name": "emp",
              "field_name": "addprovincial",
              "is_multiple_entries": 0,
              "data_type": "text",
              "sub_group_id": "personal_info",
              "group_name": "Profile",
              "sub_group_name": "Personal Information",
              "attachments": [],
              "data": "FONTEMAYOR ST. BRGY GRULLO SAN NARCISO, ZAMBALES"
            },
            {
              "primary_key": 15,
              "field_id": "religion",
              "group_id": "profile",
              "is_for_approval": 0,
              "descript": "Religion",
              "table_name": "emp",
              "field_name": "religion",
              "is_multiple_entries": 0,
              "data_type": "text",
              "sub_group_id": "personal_info",
              "group_name": "Profile",
              "sub_group_name": "Personal Information",
              "attachments": [],
              "data": "ROMAN CATHOLIC"
            },
            {
              "primary_key": 14,
              "field_id": "skills",
              "group_id": "profile",
              "is_for_approval": 0,
              "descript": "Skills & hobbies",
              "table_name": "emp",
              "field_name": "skills",
              "is_multiple_entries": 0,
              "data_type": "text",
              "sub_group_id": "personal_info",
              "group_name": "Profile",
              "sub_group_name": "Personal Information",
              "attachments": [],
              "data": "PLAYING ESPORTS AND CHESS COMPETETIVELY AND SELF STUDYING"
            },
            {
              "primary_key": 18,
              "field_id": "sssno",
              "group_id": "profile",
              "is_for_approval": 1,
              "descript": "SSS No",
              "table_name": "emp",
              "field_name": "sssno",
              "is_multiple_entries": 0,
              "data_type": "text",
              "sub_group_id": "personal_info",
              "group_name": "Profile",
              "sub_group_name": "Personal Information",
              "attachments": [
                {
                  "descript": "E4 Form",
                  "attachment_id": "sss_form"
                }
              ],
              "data": "02-4696527-1"
            },
            {
              "primary_key": 19,
              "field_id": "tinno",
              "group_id": "profile",
              "is_for_approval": 1,
              "descript": "TIN",
              "table_name": "emp",
              "field_name": "tinno",
              "is_multiple_entries": 0,
              "data_type": "text",
              "sub_group_id": "personal_info",
              "group_name": "Profile",
              "sub_group_name": "Personal Information",
              "attachments": [
                {
                  "descript": "TIN ID",
                  "attachment_id": "tin_id"
                }
              ],
              "data": "611-353-710-000"
            },
            {
              "primary_key": 17,
              "field_id": "weight",
              "group_id": "profile",
              "is_for_approval": 0,
              "descript": "Weight",
              "table_name": "emp",
              "field_name": "weight",
              "is_multiple_entries": 0,
              "data_type": "text",
              "sub_group_id": "personal_info",
              "group_name": "Profile",
              "sub_group_name": "Personal Information",
              "attachments": [],
              "data": ""
            }
          ]
        },
        "contact_info": {
          "id": "contact_info",
          "name": "Contact Information",
          "is_multiple_entries": 0,
          "data": [
            {
              "primary_key": 24,
              "field_id": "email",
              "group_id": "profile",
              "is_for_approval": 0,
              "descript": "Email address",
              "table_name": "emp",
              "field_name": "email",
              "is_multiple_entries": 0,
              "data_type": "text",
              "sub_group_id": "contact_info",
              "group_name": "Profile",
              "sub_group_name": "Contact Information",
              "attachments": [],
              "data": "gabriel.oliver.carreon@gmail.com"
            },
            {
              "primary_key": 23,
              "field_id": "mobileno",
              "group_id": "profile",
              "is_for_approval": 0,
              "descript": "Primary Mobile No",
              "table_name": "emp",
              "field_name": "mobileno",
              "is_multiple_entries": 0,
              "data_type": "text",
              "sub_group_id": "contact_info",
              "group_name": "Profile",
              "sub_group_name": "Contact Information",
              "attachments": [],
              "data": "09473302598"
            },
            {
              "primary_key": 22,
              "field_id": "telephoneno",
              "group_id": "profile",
              "is_for_approval": 0,
              "descript": "Primary Telephone No",
              "table_name": "emp",
              "field_name": "telephoneno",
              "is_multiple_entries": 0,
              "data_type": "text",
              "sub_group_id": "contact_info",
              "group_name": "Profile",
              "sub_group_name": "Contact Information",
              "attachments": [],
              "data": ""
            }
          ]
        },
        "emergency_info": {
          "id": "emergency_info",
          "name": "In Case of Emergency",
          "is_multiple_entries": 0,
          "data": [
            {
              "primary_key": 27,
              "field_id": "eaddress",
              "group_id": "profile",
              "is_for_approval": 0,
              "descript": "Address",
              "table_name": "emp",
              "field_name": "eaddress",
              "is_multiple_entries": 0,
              "data_type": "text",
              "sub_group_id": "emergency_info",
              "group_name": "Profile",
              "sub_group_name": "In Case of Emergency",
              "attachments": [],
              "data": "BRGY GRULLO SAN NARCISO, ZAMBALES"
            },
            {
              "primary_key": 25,
              "field_id": "eperson",
              "group_id": "profile",
              "is_for_approval": 0,
              "descript": "Contact person",
              "table_name": "emp",
              "field_name": "eperson",
              "is_multiple_entries": 0,
              "data_type": "text",
              "sub_group_id": "emergency_info",
              "group_name": "Profile",
              "sub_group_name": "In Case of Emergency",
              "attachments": [],
              "data": "JOCELYN F. SMITH"
            },
            {
              "primary_key": 28,
              "field_id": "econtactno",
              "group_id": "profile",
              "is_for_approval": 0,
              "descript": "Primary contact no",
              "table_name": "emp",
              "field_name": "econtactno",
              "is_multiple_entries": 0,
              "data_type": "text",
              "sub_group_id": "emergency_info",
              "group_name": "Profile",
              "sub_group_name": "In Case of Emergency",
              "attachments": [],
              "data": "09217915527"
            },
            {
              "primary_key": 26,
              "field_id": "erelationship",
              "group_id": "profile",
              "is_for_approval": 0,
              "descript": "Relationship",
              "table_name": "emp",
              "field_name": "erelationship",
              "is_multiple_entries": 0,
              "data_type": "text",
              "sub_group_id": "emergency_info",
              "group_name": "Profile",
              "sub_group_name": "In Case of Emergency",
              "attachments": [],
              "data": "MOTHER"
            }
          ]
        }
      }
    },
    "fam_background": {
      "name": "Family Background",
      "id": "fam_background",
      "sub_groups": {
        "family_info": {
          "id": "family_info",
          "name": "Family",
          "is_multiple_entries": 1,
          "fields": {
            "family_info": {
              "name": "family",
              "is_for_approval": 1,
              "data_type": "select-group",
              "descript": "Family member",
              "main_data_type": "text",
              "selection": [
                {
                  "field_id": "child",
                  "data_type": "text",
                  "label": "Child",
                  "attachments": [
                    {
                      "descript": "PSA Birth Certificate",
                      "attachment_id": "psa"
                    }
                  ]
                },
                {
                  "field_id": "parent",
                  "data_type": "text",
                  "label": "Parent",
                  "attachments": [
                    {
                      "descript": "PSA Birth Certificate",
                      "attachment_id": "psa"
                    }
                  ]
                },
                {
                  "field_id": "sibling",
                  "data_type": "text",
                  "label": "Sibling",
                  "attachments": [
                    {
                      "descript": "PSA Birth Certificate",
                      "attachment_id": "psa"
                    }
                  ]
                },
                {
                  "field_id": "spouse",
                  "data_type": "text",
                  "label": "Spouse",
                  "attachments": [
                    {
                      "descript": "Marriage Contract",
                      "attachment_id": "marriage_contract"
                    }
                  ]
                }
              ]
            }
          },
          "data": {
            "child": [],
            "parent": [
              {
                "primary_key": 29,
                "field_id": "parent",
                "group_id": "fam_background",
                "is_for_approval": 1,
                "descript": "Parent",
                "table_name": "emp_fam_others",
                "field_name": "name",
                "is_multiple_entries": 0,
                "data_type": "text",
                "sub_group_id": "family_info",
                "group_name": "Family Background",
                "sub_group_name": "Family",
                "data": "JOCELYN F. SMITH",
                "attachments": [
                  {
                    "descript": "PSA Birth Certificate",
                    "attachment_id": "psa"
                  }
                ]
              }
            ],
            "sibling": [
              {
                "primary_key": 31,
                "field_id": "sibling",
                "group_id": "fam_background",
                "is_for_approval": 1,
                "descript": "Sibling",
                "table_name": "emp_fam_others",
                "field_name": "name",
                "is_multiple_entries": 0,
                "data_type": "text",
                "sub_group_id": "family_info",
                "group_name": "Family Background",
                "sub_group_name": "Family",
                "data": "PAULINE ISOBEL F. CARREON",
                "attachments": [
                  {
                    "descript": "PSA Birth Certificate",
                    "attachment_id": "psa"
                  }
                ]
              }
            ],
            "spouse": []
          }
        }
      }
    },
    "educ_background": {
      "name": "Educational Background",
      "id": "educ_background",
      "sub_groups": {
        "board_info": {
          "id": "board_info",
          "name": "Licensure/Board Exams Taken",
          "is_multiple_entries": 1,
          "number_of_entries": 0,
          "fields": [
            {
              "field_id": "bexam",
              "data_type": "text",
              "label": "Board or licensure exam taken",
              "attachments": [
                {
                  "descript": "PRC ID",
                  "attachment_id": "prc_id"
                },
                {
                  "descript": "Result of Examination",
                  "attachment_id": "exam_result"
                }
              ],
              "is_for_approval": 1,
              "descript": "Board or licensure exam taken"
            },
            {
              "field_id": "licenseno",
              "data_type": "text",
              "label": "License no",
              "attachments": [
                {
                  "descript": "PRC ID",
                  "attachment_id": "prc_id"
                },
                {
                  "descript": "Result of Examination",
                  "attachment_id": "exam_result"
                }
              ],
              "is_for_approval": 1,
              "descript": "License no"
            },
            {
              "field_id": "rating",
              "data_type": "text",
              "label": "Rating",
              "attachments": [
                {
                  "descript": "PRC ID",
                  "attachment_id": "prc_id"
                },
                {
                  "descript": "Result of Examination",
                  "attachment_id": "exam_result"
                }
              ],
              "is_for_approval": 1,
              "descript": "Rating"
            },
            {
              "field_id": "pdtaken",
              "data_type": "date",
              "label": "Valid until",
              "attachments": [
                {
                  "descript": "PRC ID",
                  "attachment_id": "prc_id"
                },
                {
                  "descript": "Result of Examination",
                  "attachment_id": "exam_result"
                }
              ],
              "is_for_approval": 1,
              "descript": "Valid until"
            }
          ],
          "data": {
            "bexam": [],
            "licenseno": [],
            "rating": [],
            "pdtaken": []
          }
        },
        "school_info": {
          "id": "school_info",
          "name": "Schools attended",
          "is_multiple_entries": 1,
          "number_of_entries": 3,
          "fields": [
            {
              "field_id": "course",
              "data_type": "text",
              "label": "Course or Degree",
              "attachments": [
                {
                  "descript": "Transcript of Record",
                  "attachment_id": "tor"
                },
                {
                  "descript": "Diploma",
                  "attachment_id": "diploma"
                }
              ],
              "is_for_approval": 1,
              "descript": "Course or Degree"
            },
            {
              "field_id": "syear",
              "data_type": "text",
              "label": "Inclusive school year",
              "attachments": [
                {
                  "descript": "Transcript of Record",
                  "attachment_id": "tor"
                },
                {
                  "descript": "Diploma",
                  "attachment_id": "diploma"
                }
              ],
              "is_for_approval": 1,
              "descript": "Inclusive school year"
            },
            {
              "field_id": "level",
              "data_type": "text",
              "label": "Level",
              "attachments": [
                {
                  "descript": "Transcript of Record",
                  "attachment_id": "tor"
                },
                {
                  "descript": "Diploma",
                  "attachment_id": "diploma"
                }
              ],
              "is_for_approval": 1,
              "descript": "Level"
            },
            {
              "field_id": "school",
              "data_type": "text",
              "label": "School Name & Address",
              "attachments": [
                {
                  "descript": "Transcript of Record",
                  "attachment_id": "tor"
                },
                {
                  "descript": "Diploma",
                  "attachment_id": "diploma"
                }
              ],
              "is_for_approval": 1,
              "descript": "School Name & Address"
            }
          ],
          "data": {
            "course": [
              {
                "primary_key": 34,
                "field_id": "course",
                "group_id": "educ_background",
                "is_for_approval": 1,
                "descript": "Course or Degree",
                "table_name": "emp_educ_h",
                "field_name": "course",
                "is_multiple_entries": 0,
                "data_type": "text",
                "sub_group_id": "school_info",
                "group_name": "Educational Background",
                "sub_group_name": "Schools attended",
                "data": "",
                "attachments": [
                  {
                    "descript": "Transcript of Record",
                    "attachment_id": "tor"
                  },
                  {
                    "descript": "Diploma",
                    "attachment_id": "diploma"
                  }
                ]
              },
              {
                "primary_key": 34,
                "field_id": "course",
                "group_id": "educ_background",
                "is_for_approval": 1,
                "descript": "Course or Degree",
                "table_name": "emp_educ_h",
                "field_name": "course",
                "is_multiple_entries": 0,
                "data_type": "text",
                "sub_group_id": "school_info",
                "group_name": "Educational Background",
                "sub_group_name": "Schools attended",
                "data": "",
                "attachments": [
                  {
                    "descript": "Transcript of Record",
                    "attachment_id": "tor"
                  },
                  {
                    "descript": "Diploma",
                    "attachment_id": "diploma"
                  }
                ]
              },
              {
                "primary_key": 34,
                "field_id": "course",
                "group_id": "educ_background",
                "is_for_approval": 1,
                "descript": "Course or Degree",
                "table_name": "emp_educ_h",
                "field_name": "course",
                "is_multiple_entries": 0,
                "data_type": "text",
                "sub_group_id": "school_info",
                "group_name": "Educational Background",
                "sub_group_name": "Schools attended",
                "data": "B.S. INFORMATION TECHNOLOGY",
                "attachments": [
                  {
                    "descript": "Transcript of Record",
                    "attachment_id": "tor"
                  },
                  {
                    "descript": "Diploma",
                    "attachment_id": "diploma"
                  }
                ]
              }
            ],
            "syear": [
              {
                "primary_key": 35,
                "field_id": "syear",
                "group_id": "educ_background",
                "is_for_approval": 1,
                "descript": "Inclusive school year",
                "table_name": "emp_educ_h",
                "field_name": "syear",
                "is_multiple_entries": 0,
                "data_type": "text",
                "sub_group_id": "school_info",
                "group_name": "Educational Background",
                "sub_group_name": "Schools attended",
                "data": "2009-2012",
                "attachments": [
                  {
                    "descript": "Transcript of Record",
                    "attachment_id": "tor"
                  },
                  {
                    "descript": "Diploma",
                    "attachment_id": "diploma"
                  }
                ]
              },
              {
                "primary_key": 35,
                "field_id": "syear",
                "group_id": "educ_background",
                "is_for_approval": 1,
                "descript": "Inclusive school year",
                "table_name": "emp_educ_h",
                "field_name": "syear",
                "is_multiple_entries": 0,
                "data_type": "text",
                "sub_group_id": "school_info",
                "group_name": "Educational Background",
                "sub_group_name": "Schools attended",
                "data": "2012-2018",
                "attachments": [
                  {
                    "descript": "Transcript of Record",
                    "attachment_id": "tor"
                  },
                  {
                    "descript": "Diploma",
                    "attachment_id": "diploma"
                  }
                ]
              },
              {
                "primary_key": 35,
                "field_id": "syear",
                "group_id": "educ_background",
                "is_for_approval": 1,
                "descript": "Inclusive school year",
                "table_name": "emp_educ_h",
                "field_name": "syear",
                "is_multiple_entries": 0,
                "data_type": "text",
                "sub_group_id": "school_info",
                "group_name": "Educational Background",
                "sub_group_name": "Schools attended",
                "data": "2018-2022",
                "attachments": [
                  {
                    "descript": "Transcript of Record",
                    "attachment_id": "tor"
                  },
                  {
                    "descript": "Diploma",
                    "attachment_id": "diploma"
                  }
                ]
              }
            ],
            "level": [
              {
                "primary_key": 32,
                "field_id": "level",
                "group_id": "educ_background",
                "is_for_approval": 1,
                "descript": "Level",
                "table_name": "emp_educ_h",
                "field_name": "level",
                "is_multiple_entries": 0,
                "data_type": "text",
                "sub_group_id": "school_info",
                "group_name": "Educational Background",
                "sub_group_name": "Schools attended",
                "data": "PRIMARY (ELEMENTARY)",
                "attachments": [
                  {
                    "descript": "Transcript of Record",
                    "attachment_id": "tor"
                  },
                  {
                    "descript": "Diploma",
                    "attachment_id": "diploma"
                  }
                ]
              },
              {
                "primary_key": 32,
                "field_id": "level",
                "group_id": "educ_background",
                "is_for_approval": 1,
                "descript": "Level",
                "table_name": "emp_educ_h",
                "field_name": "level",
                "is_multiple_entries": 0,
                "data_type": "text",
                "sub_group_id": "school_info",
                "group_name": "Educational Background",
                "sub_group_name": "Schools attended",
                "data": "SECONDARY (HIGH SCHOOL)",
                "attachments": [
                  {
                    "descript": "Transcript of Record",
                    "attachment_id": "tor"
                  },
                  {
                    "descript": "Diploma",
                    "attachment_id": "diploma"
                  }
                ]
              },
              {
                "primary_key": 32,
                "field_id": "level",
                "group_id": "educ_background",
                "is_for_approval": 1,
                "descript": "Level",
                "table_name": "emp_educ_h",
                "field_name": "level",
                "is_multiple_entries": 0,
                "data_type": "text",
                "sub_group_id": "school_info",
                "group_name": "Educational Background",
                "sub_group_name": "Schools attended",
                "data": "TERTIARY (COLLEGE)",
                "attachments": [
                  {
                    "descript": "Transcript of Record",
                    "attachment_id": "tor"
                  },
                  {
                    "descript": "Diploma",
                    "attachment_id": "diploma"
                  }
                ]
              }
            ],
            "school": [
              {
                "primary_key": 33,
                "field_id": "school",
                "group_id": "educ_background",
                "is_for_approval": 1,
                "descript": "School Name & Address",
                "table_name": "emp_educ_h",
                "field_name": "school",
                "is_multiple_entries": 0,
                "data_type": "text",
                "sub_group_id": "school_info",
                "group_name": "Educational Background",
                "sub_group_name": "Schools attended",
                "data": "DOCE MARTIRES ELEMENTARY SCHOOL",
                "attachments": [
                  {
                    "descript": "Transcript of Record",
                    "attachment_id": "tor"
                  },
                  {
                    "descript": "Diploma",
                    "attachment_id": "diploma"
                  }
                ]
              },
              {
                "primary_key": 33,
                "field_id": "school",
                "group_id": "educ_background",
                "is_for_approval": 1,
                "descript": "School Name & Address",
                "table_name": "emp_educ_h",
                "field_name": "school",
                "is_multiple_entries": 0,
                "data_type": "text",
                "sub_group_id": "school_info",
                "group_name": "Educational Background",
                "sub_group_name": "Schools attended",
                "data": "ZAMBALES ACADEMY INC",
                "attachments": [
                  {
                    "descript": "Transcript of Record",
                    "attachment_id": "tor"
                  },
                  {
                    "descript": "Diploma",
                    "attachment_id": "diploma"
                  }
                ]
              },
              {
                "primary_key": 33,
                "field_id": "school",
                "group_id": "educ_background",
                "is_for_approval": 1,
                "descript": "School Name & Address",
                "table_name": "emp_educ_h",
                "field_name": "school",
                "is_multiple_entries": 0,
                "data_type": "text",
                "sub_group_id": "school_info",
                "group_name": "Educational Background",
                "sub_group_name": "Schools attended",
                "data": "ADAMSON UNIVERSITY/ 900 SAN MARCELINO ST., ERMITA, MANILA",
                "attachments": [
                  {
                    "descript": "Transcript of Record",
                    "attachment_id": "tor"
                  },
                  {
                    "descript": "Diploma",
                    "attachment_id": "diploma"
                  }
                ]
              }
            ]
          }
        }
      }
    },
    "emp_history": {
      "name": "Employment History",
      "id": "emp_history",
      "sub_groups": {
        "employment_info": {
          "id": "employment_info",
          "name": "Employment history",
          "is_multiple_entries": 1,
          "number_of_entries": 1,
          "fields": [
            {
              "field_id": "company",
              "data_type": "text",
              "label": "Company",
              "attachments": [
                {
                  "descript": "Certificate of Employment",
                  "attachment_id": "coe"
                }
              ],
              "is_for_approval": 1,
              "descript": "Company"
            },
            {
              "field_id": "idates",
              "data_type": "text",
              "label": "Inclusive dates",
              "attachments": [
                {
                  "descript": "Certificate of Employment",
                  "attachment_id": "coe"
                }
              ],
              "is_for_approval": 1,
              "descript": "Inclusive dates"
            },
            {
              "field_id": "position",
              "data_type": "text",
              "label": "Position",
              "attachments": [
                {
                  "descript": "Certificate of Employment",
                  "attachment_id": "coe"
                }
              ],
              "is_for_approval": 1,
              "descript": "Position"
            },
            {
              "field_id": "lpay",
              "data_type": "number",
              "label": "Rate",
              "attachments": [
                {
                  "descript": "Certificate of Employment",
                  "attachment_id": "coe"
                }
              ],
              "is_for_approval": 1,
              "descript": "Rate"
            },
            {
              "field_id": "lreason",
              "data_type": "text",
              "label": "Reason for leaving",
              "attachments": [],
              "is_for_approval": 0,
              "descript": "Reason for leaving"
            }
          ],
          "data": {
            "company": [
              {
                "primary_key": 40,
                "field_id": "company",
                "group_id": "emp_history",
                "is_for_approval": 1,
                "descript": "Company",
                "table_name": "emp_emp_h",
                "field_name": "company",
                "is_multiple_entries": 0,
                "data_type": "text",
                "sub_group_id": "employment_info",
                "group_name": "Employment History",
                "sub_group_name": "Employment history",
                "data": "UNIRISE CONSUMER GOODS TRADING",
                "attachments": [
                  {
                    "descript": "Certificate of Employment",
                    "attachment_id": "coe"
                  }
                ]
              }
            ],
            "idates": [
              {
                "primary_key": 41,
                "field_id": "idates",
                "group_id": "emp_history",
                "is_for_approval": 1,
                "descript": "Inclusive dates",
                "table_name": "emp_emp_h",
                "field_name": "idates",
                "is_multiple_entries": 0,
                "data_type": "text",
                "sub_group_id": "employment_info",
                "group_name": "Employment History",
                "sub_group_name": "Employment history",
                "data": "2022",
                "attachments": [
                  {
                    "descript": "Certificate of Employment",
                    "attachment_id": "coe"
                  }
                ]
              }
            ],
            "position": [
              {
                "primary_key": 39,
                "field_id": "position",
                "group_id": "emp_history",
                "is_for_approval": 1,
                "descript": "Position",
                "table_name": "emp_emp_h",
                "field_name": "position",
                "is_multiple_entries": 0,
                "data_type": "text",
                "sub_group_id": "employment_info",
                "group_name": "Employment History",
                "sub_group_name": "Employment history",
                "data": "PART TIME FRONT-END WEB DEVELOPER",
                "attachments": [
                  {
                    "descript": "Certificate of Employment",
                    "attachment_id": "coe"
                  }
                ]
              }
            ],
            "lpay": [
              {
                "primary_key": 42,
                "field_id": "lpay",
                "group_id": "emp_history",
                "is_for_approval": 1,
                "descript": "Rate",
                "table_name": "emp_emp_h",
                "field_name": "lpay",
                "is_multiple_entries": 0,
                "data_type": "number",
                "sub_group_id": "employment_info",
                "group_name": "Employment History",
                "sub_group_name": "Employment history",
                "data": "0",
                "attachments": [
                  {
                    "descript": "Certificate of Employment",
                    "attachment_id": "coe"
                  }
                ]
              }
            ],
            "lreason": [
              {
                "primary_key": 43,
                "field_id": "lreason",
                "group_id": "emp_history",
                "is_for_approval": 0,
                "descript": "Reason for leaving",
                "table_name": "emp_emp_h",
                "field_name": "lreason",
                "is_multiple_entries": 0,
                "data_type": "text",
                "sub_group_id": "employment_info",
                "group_name": "Employment History",
                "sub_group_name": "Employment history",
                "data": "WAS HIRED FULL TIME",
                "attachments": []
              }
            ]
          }
        }
      }
    }
  }';