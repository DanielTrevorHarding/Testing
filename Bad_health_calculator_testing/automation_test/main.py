import time
import unittest

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.select import Select
import tracemalloc

url = "http://localhost:8000/"

class Test(unittest.TestCase):

    def setUp(self):
        self.driver = webdriver.Firefox()

    def test_loads_correct_page(self):
        print("test_loads_correct_page")
        driver = self.driver
        driver.get(url)
        self.assertEqual("BMI Calculator", driver.title, "Entry page is not correct")
        print("SUCCEEDED")

    def test_loads_results_page(self):
        print("test_loads_results_page")
        driver = self.driver
        driver.get(url + "results")
        self.assertEqual("BMI Results", driver.title, "Results page is not correct")
        print("SUCCEEDED")
        
    def test_navigates_back_to_root(self):
        print("test_navigates_back_to_root")
        driver = self.driver
        driver.get(url + "results")
        again_button = driver.find_element(By.XPATH, "//button[@id='again']")
        again_button.click()
        self.assertEqual("BMI Calculator", driver.title, "Did not navigate back to home page")
        print("SUCCEEDED")

    def test_valid_input_and_output(self):
        print("test_valid_input_and_output")
        driver = self.driver
        driver.get(url)

        input_values = {
            "age": 12,
            "height": 174.0,
            "weight": 86.0,
            "waist": 86.0,
            "hip": 90.1,
            "neck": 50.0,
            "gender": "female"
        }

        expected_values = {
            "bmi-result": '28.4',
            "bmr-result": '1727',
            "bodyfat-result": '18.9'
        }

        # Get all inputs
        for key in input_values:
            if key == "gender":
                input_element = Select(driver.find_element(By.XPATH, "//select[@id='gender']"))
                input_element.select_by_value(input_values[key])
            else:
                input_element = driver.find_element(By.XPATH, "//input[@id='{}']".format(key))
                input_element.send_keys(input_values[key])

        submit_button = driver.find_element(By.XPATH, "//button[@id='click-me']")
        submit_button.click()

        self.assertEqual("BMI Results", driver.title, "Did not navigate to the results page")
        for key in expected_values:
            result = driver.find_element(By.XPATH, "//p[@id='{}']".format(key))
            self.assertEqual(result.text.split(" ")[1], expected_values[key], "Results don't match expected results")

        print("SUCCEEDED")

    def test_invalid_input_does_not_navigate(self):
        print("test_invalid_input_does_not_navigate")
        driver = self.driver
        driver.get(url)

        input_values = {
            "age": 12,
            "height": 174.0,
            "weight": 500.0,
            "waist": 86.0,
            "hip": 90.1,
            "neck": 50.0,
            "gender": "female"
        }


        # Get all inputs
        for key in input_values:
            if key == "gender":
                input_element = Select(driver.find_element(By.XPATH, "//select[@id='gender']"))
                input_element.select_by_value(input_values[key])
            else:
                input_element = driver.find_element(By.XPATH, "//input[@id='{}']".format(key))
                input_element.send_keys(input_values[key])

        submit_button = driver.find_element(By.XPATH, "//button[@id='click-me']")
        submit_button.click()

        self.assertEqual("BMI Calculator", driver.title, "Navigated away with incorrect data")
        print("SUCCEEDED")

    def tearDown(self):
        self.driver.close()

if __name__ == "__main__":
    unittest.main(warnings='ignore')