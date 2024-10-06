Feature: Registration Functionality

  Scenario: Successful registration with valid inputs
    Given the user is on the registration page
    When the user fills all fields with valid data
    And submits the registration form
    Then the user should see a message to verify their email

  Scenario: Error when all fields are empty
    Given the user is on the registration page
    When the user leaves all fields empty
    And submits the registration form
    Then the user should see error messages for empty fields

  Scenario: Error when email field is empty
    Given the user is on the registration page
    When the user leaves the email field empty
    And submits the registration form
    Then the user should see an error messages for email & confirm email fields

  Scenario: Error when confirm email field is empty
    Given the user is on the registration page
    When the user leaves the confirm email field empty
    And submits the registration form
    Then the user should see an error message for the empty email field

  Scenario: Error when password field is empty
    Given the user is on the registration page
    When the user leaves the password field empty
    And submits the registration form
    Then the user should see an error message for the empty password field

  Scenario: Error when confirm password field is empty
    Given the user is on the registration page
    When the user leaves the confirm password field empty
    And submits the registration form
    Then the user should see an error message for the empty confirm password field

  Scenario: Error when email has an invalid format
    Given the user is on the registration page
    When the user enters each invalid email in an invalid format
    Then the user should see an error message for invalid email format

  Scenario: Error when password is too short
    Given the user is on the registration page
    When the user enters a password that is too short
    And submits the registration form
    Then the user should see an error message for short password
@smoke
  Scenario: Weak password
    Given the user is on the registration page
    When the user enters a weak password
    Then the user should see a label for weak password
@smoke
  Scenario: Medium password
    Given the user is on the registration page
    When the user enters a medium password
    Then the user should see a label for medium password
@smoke
  Scenario: Strong password
    Given the user is on the registration page
    When the user enters a strong password
    Then the user should see a label for strong password

  Scenario: Error when "Password" and "Confirm Password" do not match
    Given the user is on the registration page
    When the user enters a password and a different confirm password
    And submits the registration form
    Then the user should see an error message for mismatched passwords

  @firefox @edge @safari 
  Scenario: Error when Terms and Conditions are not accepted
    Given the user is on the registration page
    When the user fills all fields but does not accept the terms and conditions
    And submits the registration form
    Then the user should see an error message for not accepting the terms and conditions

# Scenario: Error when username is already registered
#     Given the user is on the registration page
#     When the user enters a username that is already registered
#     And submits the registration form
#     Then the user should see an error message for already registered username
