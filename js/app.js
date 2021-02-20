'use strict'

$(document).ready(function () {

    var allImages = [];
    let filter = $('#filter')
    let main = $('main')
    let photoTemplate = $('.photo-template')
    photoTemplate.css({ "display": "none" })



    // constructor
    function Gallery(item) {

        this.title = item.title;
        this.image_url = item.image_url;
        this.desc = item.description;
        this.keyword = item.keyword;
        this.horns = item.horns

        allImages.push(this)


    }

    //ajax

    function pageNum (){

        $.ajax({
            url: "page-1.json",
            type: "GET"
        }).then(function (data) {
            data.forEach(item => {
                let photo = new Gallery(item)
                photo.render()
                photo.renderSelct()
    
            });
    
        })


    }
    

   

    // render img
    Gallery.prototype.render = function () {

        let dataClone = photoTemplate.clone();
        dataClone.removeClass('photo-template')
        dataClone.find('h2').text(this.title);
        dataClone.find('img').attr("src", this.image_url);
        dataClone.find('p').text(this.desc);
        dataClone.css({ "display": "block" })
        main.append(dataClone);


    }


    // render keywords
    Gallery.prototype.renderSelct = function () {

        if (allImages.includes(this.keyword) == false) {
            $('#filter').append(`<option value =${this.keyword}>${this.keyword}</option>`);
            allImages.push(this.keyword);
            console.log(allImages)


        }


    }

    // filter data

    filter.change(() => {

        main.empty()

        if (filter.val() == "default") {
            allImages.forEach(item => {
                let dataClone = photoTemplate.clone();
                dataClone.removeClass('photo-template')
                dataClone.find('h2').text(item.title);
                dataClone.find('img').attr("src", item.image_url);
                dataClone.find('p').text(item.desc);
                dataClone.css({ "display": "block" })
                main.append(dataClone);



            })
        } else {

            allImages.forEach(item => {
                if (filter.val() == item.keyword) {
                    let dataClone = photoTemplate.clone();
                    dataClone.removeClass('photo-template')
                    dataClone.find('h2').text(item.title);
                    dataClone.find('img').attr("src", item.image_url);
                    dataClone.find('p').text(item.desc);
                    dataClone.css({ "display": "block" })

                    main.append(dataClone);

                }

            })


        }
    })

})






