document.addEventListener( "DOMContentLoaded" , () => {
    getDogs()
})

const getDogs = () => {
    fetch("http://localhost:3000/pups")
        .then( response => response.json() )
        .then( dogs => dogs.forEach(
            dog => { renderDog(dog) }
        ) )
}

const renderDog = (dog) => {
    const dogBar = document.getElementById("dog-bar")

    const dogSpan = document.createElement("span")
    dogSpan.innerText = dog.name

    dogSpan.addEventListener( "click" , () => {
        showDogDetails(dog)
    })

    dogBar.append(dogSpan)
}

const showDogDetails = (dog) => {
    const dogInfo = document.getElementById("dog-info")
    dogInfo.innerHTML = ""

    const dogImage = document.createElement("img")
    dogImage.src = dog.image

    const dogName = document.createElement("h2")
    dogName.innerText = dog.name
    
    const dogButton = document.createElement("button")
    if ( dog.isGoodDog ) {
        dogButton.innerText = "Good Dog!"
    } else {
        dogButton.innerText = "Bad Dog!"
    }

    dogButton.addEventListener( "click" , () => {
        changeDogStatus(dog, dogButton)
    })

    dogInfo.append(dogImage, dogName, dogButton)
}

const changeDogStatus = (dog, dogButton) => {
    let newStatus = dog.isGoodDog

    if ( dogButton.innerText == "Good Dog!" ){
        dogButton.innerText = "Bad Dog!"
        newStatus = false
    } else {
        dogButton.innerText = "Good Dog!"
        newStatus = true
    }

    fetch(`http://localhost:3000/pups/${dog.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            isGoodDog: newStatus
        })
    })
}