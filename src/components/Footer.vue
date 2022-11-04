<template>
    <div class="footer-main">
        <div class="social"><a href="#"><i class="fa-brands fa-instagram"></i></a><a href="#"><i
                    class="fa-brands fa-snapchat"></i></a><a href="#"><i class="fa-brands fa-twitter"></i></a><a
                href="#"><i class="fa-brands fa-facebook"></i></a></div>
        <ul class="list-inline">
            <li class="list-inline-item"><a href="#">Home</a></li>
            <li class="list-inline-item"><a href="#">Services</a></li>
            <li class="list-inline-item"><a href="#">About</a></li>
            <li class="list-inline-item"><a href="#">Terms</a></li>
            <li class="list-inline-item"><a href="#">Privacy Policy</a></li>
        </ul>
        <p class="copyright">Jobboard © 2022</p>
    </div>
</template>

<script>

</script>

<style scoped>
.footer-main {
    margin-top: 3vw;
    display: inline-block;
    color: white;
    background-color: #2F365F;
    height: auto;
    width: 100%;
    padding: 3vh;
    padding: 40px 0;
}

.footer-main ul {
    padding: 0;
    list-style: none;
    text-align: center;
    font-size: 13px;
    /* line-height:1.6; */
    margin-bottom: 0;
}

.footer-main li {
    padding: 0 10px;
}

.footer-main ul a {
    color: inherit;
    text-decoration: none;
    opacity: 0.8;
}

.footer-main ul a:hover {
    opacity: 0.5;
}

.footer-main .social {
    text-align: center;
    /* padding-bottom:25px; */
}

.footer-main .social>a {
    font-size: 24px;
    width: 40px;
    height: 40px;
    line-height: 40px;
    display: inline-block;
    text-align: center;
    border-radius: 50%;
    border: 1px solid #ccc;
    margin: 0 8px;
    color: inherit;
    opacity: 0.75;
}

.footer-main .social>a:hover {
    opacity: 1;
}

.footer-main .copyright {
    margin-top: 15px;
    text-align: center;
    font-size: 13px;
    color: #aaa;
    margin-bottom: 0;
}
</style>