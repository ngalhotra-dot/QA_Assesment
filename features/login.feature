Feature: VW Sales Force Chat Bot

  Scenario: Successful Login

 Given User launches the application

    When User enters valid username and password
    And User clicks Login button

    Scenario: Navigate to Workshop Order

 Given User launches the application

    When User enters valid username and password
    And User clicks Login button
    Then User navigate to the order page



  Scenario: Add Job

 Given User launches the application

    When User enters valid username and password
    And User clicks Login button
    Then User navigate to the order page
    Then User clicks on Add Job

    Scenario: Search TPI

 Given User launches the application

    When User enters valid username and password
    And User clicks Login button
    Then User navigate to the order page
    Then User clicks on Add Job
    Then User enters job description
    Then User clicks on Create Job button
    Then User clicks on Search

    Scenario: Refresh TPI

 Given User launches the application

    When User enters valid username and password
    And User clicks Login button
    Then User navigate to the order page
    Then User clicks on Add Job
    Then User enters job description
    Then User clicks on Create Job button
    Then User clicks on Search
    Then User clicks on Refresh TPI


Scenario: Access Workshop Order Refine TPI

 Given User launches the application

    When User enters valid username and password
    And User clicks Login button
    Then User navigate to the order page
    Then User clicks on Add Job
    Then User enters job description
    Then User clicks on Create Job button
    Then User clicks on Search
    Then User clicks on Refresh TPI
    Then User clicks on Open TPI
    Then User access TPI Details
    Then User click on Document, attachment and Symptoms tab
    Then User extract TPI Details
    Then User click on Close button
    Then User click on AgentForce
    Then User click on Refine TPI
    Then User logs out
@june

    Scenario: Access Workshop Order improve customer Statement

 Given User launches the application

    When User enters valid username and password
    And User clicks Login button
    Then User should fill the verification code and click verify button
    Then User navigate to the order page
    Then User clicks on Add Job
   Then User clicks on Create Job button
   Then User clicks on Add Job
    Then User enters job description
    Then User clicks on Create Job button
    Then User clicks on Search
    Then User clicks on Refresh TPI
    Then User clicks on Open TPI
    Then User access TPI Details
    Then User click on Document, attachment and Symptoms tab
    Then User extract TPI Details
    Then User click on Close button
    Then User click on AgentForce
    Then User improve customer Statement
    Then User logs out

      Scenario: Access Workshop Order Recommend TPI

 Given User launches the application

    When User enters valid username and password
    And User clicks Login button
    Then User navigate to the order page
    Then User clicks on Add Job
    Then User enters job description
    Then User clicks on Create Job button
    Then User clicks on Search
    Then User clicks on Refresh TPI
    Then User clicks on Open TPI
    Then User access TPI Details
    Then User click on Document, attachment and Symptoms tab
    Then User extract TPI Details
    Then User click on Close button
    Then User click on AgentForce
    Then User click on Recommend TPI
    Then User logs out
