document.addEventListener('DOMContentLoaded', function() {

  const currentUrl = new URL(window.location.href);

  const queryParams = currentUrl.searchParams;

  const Calculators = {
    BodyFat: 'bodyfat',
    BMI: 'bmi',
    BMR: 'bmr',
  };

  const endpoints = {
    [Calculators.BodyFat]: new URL('/calculator/bodyfat', window.location.href),
    [Calculators.BMI]: new URL('/calculator/bmi', window.location.href),
    [Calculators.BMR]: new URL('/calculator/bmr', window.location.href),
  };

  const elements = {
    [Calculators.BodyFat]: document.getElementById('bodyfat'),
    [Calculators.BMI]: document.getElementById('bmi'),
    [Calculators.BMR]: document.getElementById('bmr'),
  }

  for (const key of queryParams.keys()) {

    for (const endpoint of Object.keys(endpoints)) {

      endpoints[endpoint].searchParams.append(key, queryParams.get(key));
    }
  }

  for (const calculator of Object.values(Calculators)) {

    fetch(endpoints[calculator])
        .then(response => {
            if (!response.ok) {
                throw new Error('An Error occured');
            }
            return response.json();
        })
        .then(data => {

            const heading = document.createElement('h2');
            heading.textContent = `${data.type}:`;
            elements[calculator].appendChild(heading);

            const result = document.createElement('p');
            result.id = `${calculator}-result`;
            result.textContent = `Result: ${data.result} ${data.units}`;
            elements[calculator].appendChild(result);
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
  }

});
