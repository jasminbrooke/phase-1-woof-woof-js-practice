document.addEventListener("DOMContentLoaded", () => {
    const bar = document.getElementById("dog-bar")
    const info = document.getElementById("dog-info")

    fetch('http://localhost:3000/pups')
    .then (res => res.json())
    .then (data => renderDogs(data))

    const renderDogs = (dogs) => {
        dogs.forEach(pup => {
            const span = document.createElement("span")
            span.setAttribute("id", pup.id)
            bar.appendChild(span)
            span.innerText = pup.name
            span.addEventListener("click", () => {
                const h2 = document.createElement("h2")
                const img = document.createElement("img")
                const button = document.createElement("button")
                h2.innerText = pup.name
                img.setAttribute("src", pup.image)
                button.innerText = pup.isGoodDog ? "Good Dog!" : "Bad Dog!"
                while (info.firstChild) {
                    info.removeChild(info.firstChild)
                }
                info.append(h2, img, button)
                button.addEventListener("click", () => {
                    if (button.innerText === "Good Dog!") {
                        button.innerText = "Bad Dog!"
                        
                    }
                    else {
                        button.innerText = "Good Dog!"
                    }
                    const body = {...pup}
                    body.isGoodDog = !pup.isGoodDog
                    fetch(`http://localhost:3000/pups/${pup.id}`, {
                        method: 'PATCH',
                        headers: {"Content-type": "application/json"},
                        body: JSON.stringify(body)
                    })
                })
            })
        })
    }
})