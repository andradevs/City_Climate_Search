
const url = 'http://apiadvisor.climatempo.com.br'
const proxy = 'https://cors-anywhere.herokuapp.com/'

const keyToken = '57b8a616254565edec85c8ca4e543505'

const config = {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
}

const loader = document.createElement('img')
loader.setAttribute('src', './img/loader.gif')



async function buscaTempo(e) {

    console.log('aaaaaaaaaaaa')

    let btn = document.querySelector('.btn')
    btn.appendChild(loader)

    const city = document.getElementById('city').value
    const state = document.getElementById('state').value

    // GET the cityId
    const cityID = await axios.get(`${proxy}${url}/api/v1/locale/city?name=${city}&state=${state}&token=${keyToken}`)
        .then(res => res.data[0].id).catch(e => {
            btn.removeChild(loader)
            addInfo(404)
        })
    
    console.log(cityID)

    if (!cityID) return 'dsadas'

    console.log(cityID)


    await axios.put(`${proxy}http://apiadvisor.climatempo.com.br/api-manager/user-token/${keyToken}/locales`,
        `localeId[]=${cityID}`, config)
        .then(res => console.log(res.data))

    const response = await axios.get(`${proxy}${url}/api/v1/weather/locale/${cityID}/current?token=${keyToken}`)
        .then(res => res.data)

    console.log(response)
    btn.removeChild(loader)
    addInfo(response)
    }

function addInfo(res) {
    const div = document.querySelector('#info')
    if (!div.classList.contains('show')) div.classList.toggle('show')
    if (res != 404) {
        content =
            `<a>C</a>
            <h1>${res.name}</h1>
            <div class="temperature">
                <p temp ='${res.data.temperature}'>${res.data.temperature}°C</p>
                <img src="./img/200px/${res.data.icon}.png" alt="${res.data.condition}"></img>
            </div>`
            div.innerHTML = content
            a = document.querySelector('#info a')
            a.onclick = convert
    }
    else{
        content = '<h1>Não Encontrada.</h1>'
        div.innerHTML = content
    }

    

}

function convert(e){
    e.preventDefault()
    temp = document.querySelector('#info p')
    unit = document.querySelector('#info a')
    if(unit.innerHTML == 'C'){
        newValue = Math.round(parseInt(temp.getAttribute('temp')) * (9/5) + 32)
        temp.setAttribute('temp',`${newValue}`)
        temp.innerHTML = `${newValue}°F`
        unit.innerHTML = 'F'
    }else{
        newValue = Math.round((parseInt(temp.getAttribute('temp'))-32) * (5/9))
        temp.setAttribute('temp',`${newValue}`)
        temp.innerHTML = `${newValue}°C`
        unit.innerHTML = 'C'
    }
    
}
