/* toogle the popmenu on clicking the profile navigation list item*/
const mid_container = document.getElementById('mid-container');
const home_page = document.getElementById('home-page');
const profile_page = document.getElementById('profile-page');
const load_nav_css = document.getElementById("load-nav-style");
const load_nav_script = document.getElementById("load-nav-script");

const make_iframe = (url) => {
    const new_iframe = document.createElement("iframe");
    new_iframe.setAttribute('src',url);
    new_iframe.setAttribute('id','nav-iframe');
    new_iframe.setAttribute('frameborder','0');
    new_iframe.setAttribute('onload','iframe_load()');
    return new_iframe;
}

const make_script = (url) => {
    const new_script = document.createElement("script");
    new_script.setAttribute('src',url);
    new_script.setAttribute('id',"load-nav-script");
    return new_script;
}

var load_this_script = "./scripts/profile.js";

home_page.addEventListener('click',(e)=>{
    e.stopPropagation();
    mid_container.removeChild(mid_container.childNodes[1]);
    const new_element = make_iframe('home.html');
    body_select.appendChild(new_element);
    console.log("homepage Event listener");
    load_nav_css.href = './styles/home.css';

    const to_be_removed = document.getElementById('load-nav-script');
    to_be_removed.parentNode.removeChild(to_be_removed);
    load_this_script = "./scripts/home.js";
 
    console.log("previous script removed");
    console.log(load_this_script);
    console.log("new script appended");
},false);

profile_page.addEventListener('click',(e)=>{
    e.stopPropagation();
    mid_container.removeChild(mid_container.childNodes[1]);
    const new_element = make_iframe('profile.html');
    body_select.appendChild(new_element);

    const to_be_removed = document.getElementById('load-nav-script');
    to_be_removed.parentNode.removeChild(to_be_removed);

    console.log("profilepage Event listener");
    load_this_script = "./scripts/profile.js";
    load_nav_css.href = "./styles/profile.css";
},false);

const iframe_load = () => {
    const iframe_id = document.getElementById('nav-iframe');
    console.log("iframeloads: ", iframe_id.contentDocument.body.children[0]);
    mid_container.appendChild(iframe_id.contentDocument.body.children[0]);
    //script attaching
    console.log("the name of script is: ",load_this_script);

     body_select.appendChild(make_script(load_this_script));
  
    iframe_id.remove();
    flag = false;
    console.log("iframe_loads")
}

const show_drop_down = (e) => {
    e.preventDefault();
    const d = document.getElementById('profile-menu-id');
    d.classList.toggle('active');
}

const body_select = document.getElementById('body');
const media_search = document.getElementById('media-search');
const hidden_search = document.getElementById('hidden-search');


/* when clicking on anywhere except on the input search the media search class disable*/
body_select.addEventListener('click',(e)=>{
    // e.stopPropagation();
    document.getElementById('nav-items').classList.remove('hide-nav-items');
    document.getElementById('media-search').classList.remove('media-search-show');
    document.getElementById('logo-search').classList.remove('logo-search-width');
    document.getElementById('hidden-search').classList.remove('hidden-search-hide');
    console.log("clicking on body");
    console.log(e.target);
}, false);


/* on clicking on the hidden_search show the media-search */
hidden_search.addEventListener('click',(e)=>{
    e.stopPropagation();
    console.log('event');
    document.getElementById('nav-items').classList.add('hide-nav-items');
    document.getElementById('media-search').classList.add('media-search-show');
    document.getElementById('logo-search').classList.add('logo-search-width');
    document.getElementById('hidden-search').classList.add('hidden-search-hide');
},false);

/* when clicked on media search stop the propogation*/
media_search.addEventListener('click',(e)=>{
    e.stopPropagation();
},false);

/** experiment */



