$(() => {

    const ANIMTIME = 200
    var overlay_current_form = "login"
    var current_test = null


    // Удобные функции для установки глобальных переменных css
    function setProp(prop, value){
        document.documentElement.style.setProperty(`--${prop}`, `${value}`)
    }

    function showOnly(element){
        var arr = [
            "create-test",
            "pass-test",
            "test-find",
            "test-finish"
        ]

        arr.forEach(el => {
            if(el == element) $(`#${el}`).show()
            else $(`#${el}`).hide()
        });
    }

    function fetchTestList(keyword){
        $("#test-list").html("")
        fetch(`http://localhost:5000/api/search?query=${keyword}`)
        .then(response => response.json())
        .then(data => {
            if(data.length == 0) $("#test-list").html("Тести не знайдені")
            data.forEach(element => {
                $("#test-list").append(`
                    <div class="test-list-row">
                        <p class="test-list-name">${element.title}</p>
                        <button id="pass-test-${element.id}" class="start-pass-test">
                        </button>
                    </div>
                `)
            });
        })
        .catch(error => console.error('Ошибка поиска:', error));
    }

    function getAvatar(){
        $.get("http://localhost:5000/avatar/" + localStorage.getItem("userId"), (data) => {
            if (data.avatarUrl) {
                $("#user-settings-avatar, #profile-photo").attr("src", "http://localhost:5000/"+data.avatarUrl);
            }
        });
    }


    // Устанавливаем дефолтные значения переменных css

    setProp("overlay-display", "none")
    setProp("overlay-opacity", "0%")
    setProp("user-settings-overlay-display", "none")
    setProp("user-settings-overlay-opacity", "0%")
    setProp("global-anim-time", `${ANIMTIME}ms`)
    setProp("login-form-rotate", "0deg")
    setProp("registration-form-rotate", "90deg")
    setProp("test-time-bar", "90%")
    setProp("show-pass-test", "none")
    $("#create-test-progress-bar").html(`40 хв.`)
    setProp("create-time-bar", `17%`)
    $("#profile-photo").hide()
    

    fetchTestList("")

    showOnly("test-find")


    function showOverlay(isShow) {
        if(isShow){
            setProp("overlay-display", "block")
            setTimeout(()=>setProp("overlay-opacity", "100%"), ANIMTIME/10)
        } else {
            setProp("overlay-opacity", "0%")
            setTimeout(()=>setProp("overlay-display", "none"), ANIMTIME)
        }
    }

    function showSettingsOverlay(isShow) {
        if(isShow){
            setProp("user-settings-overlay-display", "flex")
            setTimeout(()=>setProp("user-settings-overlay-opacity", "100%"), ANIMTIME/10)
        } else {
            setProp("user-settings-overlay-opacity", "0%")
            setTimeout(()=>setProp("user-settings-overlay-display", "none"), ANIMTIME)
        }
    }

    function allowPassTest(isAllow) {
        if(isAllow) setProp("show-pass-test", "block")
        else        setProp("show-pass-test", "0%")
        
    }

    $("#overlay-show").on("click", () => {
        showOverlay(true)
    })

    $("#profile-photo").on("click", () => {
        $.get("http://localhost:5000/profile/"+localStorage.getItem("userId"), (data) => {
            $("#user-settings-name").val(data.first_name)
            $("#user-settings-lastname").val(data.last_name)
        })
        $.get("http://localhost:5000/api/profile/"+localStorage.getItem("userId"), (data) => {
            $("#user-settings-tests-result").html(data.tests.map(c => `
                <div class="profile-test-result">
                    Тест: ${c.title} ${c.score}% з ${c.total_questions} завданнь
                </div>
            `).join(""))
        })
        showSettingsOverlay(true)
    })

    $("#user-settings-save").on("click", ()=>{
        fetch(`http://localhost:5000/profile`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                "id":localStorage.getItem("userId"),
                "first_name":$("#user-settings-name").val(),
                "last_name":$("#user-settings-lastname").val(),
                "birth_year":"2005",
                "role":"student",
                "phone_number":"sdfgsdfg"
            })
        }).then(response => response.json())
        .then(responseData => {
            if (responseData.message) {
                alert("Профиль обновлен!");
            } else {
                alert("Ошибка при обновлении: " + responseData.error);
            }
        })
        .catch(error => {
            console.error("Ошибка при сохранении профиля:", error);
            alert("Ошибка при обновлении данных.");
        });
    })

    $("#user-settings-overlay-close").on("click", () => {
        showSettingsOverlay(false)
    })

    $("#overlay-close").on("click", () => {
        showOverlay(false)
    })

    $("#goto-create-test").click(() => {
        showOnly("create-test")
    })


    $("#overlay-change-form").on("click", () => {
        $("#overlay-change-form").html(overlay_current_form === "login" ? "Маєте акаунт?" : "Немає акаунта?")
        if(overlay_current_form == "login"){
            setProp("login-form-rotate", "-90deg")
            setTimeout(() => {
                setProp("registration-form-rotate", "0deg")
            }, ANIMTIME)
        } else {
            setProp("registration-form-rotate", "90deg")
            setTimeout(() => {
                setProp("login-form-rotate", "0deg")
            }, ANIMTIME)
        }
        overlay_current_form = overlay_current_form === "login" ? "registration" : "login"
    })
    
    $(".category").click(function () {
        if($(this).hasClass("category-selected"))
            $(this).removeClass("category-selected")
        else 
            $(this).addClass("category-selected")
    });

    $(document).on("click", ".answer-remove", function () { $(this).parent().remove() })

    $(document).on("click", ".task-remove", function () { $(this).parent().remove() })

    $(document).on("click", ".task-add", function() {
        $(`
            <div class="create-test-task">
                <p class="create-test-task-question">
                    <input type="text" placeholder="Введіть питання">
                </p>
                <button class="answer-add">Додати відповідь</button>
                <button class="task-remove">Видалити питання</button>
            </div>
        `).insertBefore(this)
    })

    $(document).on("click", ".answer-add", function() {
        $(`
            <p>
                <input type="checkbox"/>
                <input type="text" placeholder="Введіть відповідь">
                <button class="answer-remove">Видалити відповідь</button>
            </p>            
        `).insertBefore(this)
    })

    $("#create-test-progress-bar").click((event)=>{
        let offsetX = event.offsetX;
        let elementWidth = $("#create-test-progress-bar").outerWidth();
        console.log(offsetX, elementWidth) 
        let value = Math.round((offsetX / elementWidth) * 240);
        console.log("Значение:", value);
        $("#create-test-progress-bar").html(`${value} хв.`)
        setProp("create-time-bar", `${Math.round((offsetX / elementWidth) * 100)}%`)
    })

    let timer;
    $('#search-field').on('input', function() {
        clearTimeout(timer);
        const query = $(this).val();
    
        timer = setTimeout(() => {
            fetchTestList(query)
        }, 500);
    })

    function login(){
        $.post(
            "http://localhost:5000/api/login",
            {
                email:    overlay_current_form === "login" ? $("#login-input-email").val()    : $("#registration-input-email").val(),
                password: overlay_current_form === "login" ? $("#login-input-password").val() : $("#registration-input-password").val()
            },
            (data) => {
                console.log(data)
                if(data.error === undefined){
                    localStorage.setItem("userId", data.userId);
                    allowPassTest(true)
                    $("#overlay-show").hide()
                    showOverlay(false)
                    $("#profile-photo").show()
                    getAvatar()
                }
            }
        )
    }

    $("#registration-btn").on("click", () => {
        if($("#registration-input-password").val() !== $("#registration-input-password-confirm").val()){
            alert("Паролі не співпадають")
            return
        }
        $.post(
            "http://localhost:5000/api/users",
            {
                email:$("#registration-input-email").val(),
                password:$("#registration-input-password").val()
            },
            () => {
                login()
            }
        )
    })

    $("#login-btn").on("click", () => {
        login()
    })

    $(document).on("click", ".start-pass-test", function () {
        console.log($(this).attr('id'))
        $.get(`http://localhost:5000/api/tests/${$(this).attr('id').replace("pass-test-", "")}`, (data) => {
            current_test = data
            console.log(data)
            $("#pass-test-task-holder").html("")
            data.questions.forEach(el => {
                var task = $(`<div class="pass-test-task" id="taskid${el.id}"><p class="pass-test-task-question">${el.question_text}</p></div>`)
                el.answers.forEach(el1 => {
                    task.append($(`
                        <p>
                            <input type="checkbox" id="answid${el1.id}" name="task1"/>
                            <label for="contactChoice1">${el1.answer_text}</label>
                        </p>
                    `))
                })
                $("#pass-test-task-holder").append(task)
            });
            showOnly("pass-test")
        })
    })

    $("#pass-test-submit").on("click", () => {
        var answers = []
        current_test.questions.forEach(el => {
            var task = {question_id: el.id}
            task.answer_ids = []
            el.answers.forEach(el1 => {
                if($(`#answid${el1.id}`).prop("checked")) 
                    task.answer_ids.push(el1.id)
            })
            if(task.answer_ids.length !== 0) answers.push(task)
        });
        console.log(answers)
        $.post("http://localhost:5000/api/submit",
            {
                answers: answers,
                test_id: current_test.test.id,
                user_id: localStorage.getItem("userId")
            }, (data) => {
                function loadComents(){
                    $.get(`http://localhost:5000/api/comments/${current_test.test.id}`, (data) => {
                        console.log(data)
                        $("#test-finish-comments").html(data.map(c =>
                            `
                                <div class="comment">
                                    <strong>${c.first_name} ${c.last_name}</strong> (Оценка: ${c.rating}/5)
                                    <p>${c.comment}</p>
                                    <small>${new Date(c.created_at).toLocaleString()}</small>
                                </div>
                            `
                        ).join(''))
                    })
                }
                console.log(data)
                $("#test-finish-mark-field").html(`Ваші парвильні відповіді: ${data.score} з ${data.total}!`)
                showOnly("test-finish")
                loadComents()

                $("#add-comment").on("click", () => {
                    $.post("http://localhost:5000/api/add-comment", {
                        user_id:localStorage.getItem("userId"),
                        test_id:current_test.test.id,
                        rating:$("#test-finish-your-comment-mark").val(),
                        comment:$("#test-finish-your-comment-text").val()
                    }, () => {
                        loadComents()
                    })
                })
            } 
        )
    })

    $("#logo").click(() => {
        showOnly("test-find")
    })

    if(localStorage.getItem("userId")){
        allowPassTest(true)
        $("#overlay-show").hide()
        showOverlay(false)
        $("#profile-photo").show()
        $("#add-comment").unbind("click")
        getAvatar()
    }

    $("#create-test-confirm").click(()=>{
        let questions = [];

        $("#create-test-task-holder .create-test-task").each(function () {
            let questionText = $(this).find(".create-test-task-question input").val().trim();
            let answers = [];

            $(this).find("p").each(function () {
                let checkbox = $(this).find("input[type='checkbox']");
                let answerText = $(this).find("input[type='text']").val().trim();

                if(checkbox.prop("checked") === undefined) return;
                // Проверяем, чтобы ответ не был пустым
                if (answerText) {
                    answers.push({
                        text: answerText,
                        isCorrect: checkbox.prop("checked")
                    });
                }
            });

            if (questionText && answers.length > 0) {
                questions.push({
                    text: questionText,
                    answers: answers
                });
            }
        });
        console.log(questions)

        $.post("http://localhost:5000/api/create-test", {
            "title":$("#create-test-name").val(),
            "subject":"math",
            "userId":localStorage.getItem('userId'),
            "questions":questions
        }, ()=> {
            showOnly("test-find")
        })
    })

    $("#user-settings-avatar").click(function(){
        let input = $("<input>", { type: "file", accept: "image/*" }).appendTo("body").hide();

        input.change(function () {
            let file = this.files[0];
            if (!file) return;

            let formData = new FormData();
            formData.append("avatar", file);
            formData.append("userId", localStorage.getItem("userId"));

            $.ajax({
                url: "http://localhost:5000/upload-avatar",
                type: "POST",
                data: formData,
                processData: false,
                contentType: false,
                success: (response) => {
                    console.log("Ответ сервера:", response)
                    getAvatar()
                },
                error: (xhr, status, error) => console.error("Ошибка загрузки:", error)
            });

            input.remove(); // Удаляем input после выбора файла
        });

        input.click();
        
    })
});