var opt_container = document.getElementById('option-container');
var selected_img = document.getElementById('selected-img');
var selected_label = document.getElementById('selected-label');
var selected = document.getElementById('opt-selected');
var drop_down_img = document.getElementById('drop-down-img');
var click_on_post = document.getElementById('click-post');
var click_on_post_box = document.getElementById('create-post-box');
var option_listener = document.querySelectorAll('.option');
var dialogue_background = document.getElementById('dialogue-box');
var comment_input = document.getElementById('id-comment-it');
var class_comment_it = document.querySelector('.comment-it');
var comment_button = document.getElementById('post-comment-button-id');

selected.addEventListener('click',(e)=>{
    opt_container.classList.toggle('option-container-active');
    drop_down_img.classList.toggle('drop-down-img');
    e.stopPropagation();
},false);

comment_input.addEventListener("keydown",(e)=>{
    /* since there is a delay in key press and change in value's length*/
    setTimeout(()=>{
    const height = 40 + parseInt((comment_input.value.length)/60)*30
    comment_input.style.height = height + 'px';
    
    if(comment_input.value.length == 0){

        comment_button.classList.add('post-comment-button-hide');
    }
    else{
        comment_button.classList.remove('post-comment-button-hide');
    }

    e.stopPropagation();
    },50);
}
)

option_listener.forEach((i)=>{
    i.addEventListener('click',(e)=>{
        selected_img.src = i.querySelector('img').src;
        selected_label.innerHTML = i.querySelector('label').innerHTML;
        opt_container.classList.remove('option-container-active');
        drop_down_img.classList.remove('drop-down-img');
        e.stopPropagation();
    },false)
});

click_on_post.addEventListener('click',(e)=>{
    e.stopPropagation();
    console.log("click on post");
    dialogue_background.classList.add('show-dialogue');
});

click_on_post_box.addEventListener('click',(e)=>{
    if(e.target.id == "close-dialogue")
    {
        dialogue_background.classList.remove('show-dialogue');
    }
    e.stopPropagation();
});

dialogue_background.addEventListener('click',(e)=>{
    e.stopPropagation();
    dialogue_background.classList.remove('show-dialogue');
});

comment_button.addEventListener('click',(e)=>{
    e.stopPropagation();
    console.log("button clicked");
});



