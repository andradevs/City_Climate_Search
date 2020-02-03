
const url = 'http://apiadvisor.climatempo.com.br'
const proxy = 'https://cors-anywhere.herokuapp.com/'

const keyToken = '57b8a616254565edec85c8ca4e543505'

const config = {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
}



async function buscaTempo() {

    const city = document.getElementById('city').value
    const state = document.getElementById('state').value

    // GET the cityId
    const cityID = await axios.get(`${proxy}${url}/api/v1/locale/city?name=${city}&state=${state}&token=${keyToken}`)
        .then(res => res.data[0].id)
    console.log(cityID)


    await axios.put(`${proxy}http://apiadvisor.climatempo.com.br/api-manager/user-token/${keyToken}/locales`,
        `localeId[]=${cityID}`,config)
        .then(res=>console.log(res.data))
        .catch(err=> console.log('deu ruim'))

    const response = await axios.get(`${proxy}${url}/api/v1/weather/locale/${cityID}/current?token=${keyToken}`)
    .then(res => res.data)

    console.log(response)
    addInfo(response)
}

function addInfo(res){
    const div = document.getElementById('info')
    const cityName = `<h1>${res.name}</h1>`
    const temperature = `<p>${res.data.temperature}</p>`
    const img = `<img src='./200px/${res.data.icon}'>`
    div.appendChild(cityName)
    div.appendChild(temperature)
    div.appendChild(img)
    


}
