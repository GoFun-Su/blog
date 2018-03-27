<style lang="stylus">
    .list li.content-box
        border-top:1px solid rgba(178,186,194,.15)
        transition: box-shadow ease-in-out .15s
        -webkit-transition: box-shadow ease-in-out .15s
        padding:20px
    .list li.content-box:hover
        background:#fbfbfb
        cursor: pointer
    .list li.content-box a
        padding:0
        display: -webkit-box
        display: -ms-flexbox
        display: flex
        justify-content: space-between
    .list li.content-box a img.picture
        width:80px
        height:80px
    .list li.content-box ul
        display: -webkit-box
        display: -ms-flexbox
        display: flex
    .list li.content-box ul li 
        padding-right:5px
    .list li.content-box ul li a
        font-size:10px
    .list li.content-box ul li a.tag:hover
        color:#007fff
    .info-box .title-info
        line-height: 20px
        font-weight: bold
        font-size: 17px
        margin-top: 10px
        margin-bottom: 15px
        color:#333
    .active-list li
        border: 1px solid #edeeef
        border-radius: 2px
        padding: 3px 10px
        font-weight: bold
        background:#fff
    .active-list li:hover 
        background:#fbfbfb
</style>
<template>
    <ul class="list">
        <li class="content-box">
            <a>
                <div class="info-box">
                    <ul>
                        <li><a href="">18小时前</a></li>
                        <li><a href="">fitzeng</a></li>
                        <li><a href="" class="tag">人工智能</a></li>
                        <li><a href="" class="tag">机器学习</a></li>
                    </ul>
                    <div>
                        <a class="title-info">[机器学习收藏] TensorFlow初学者必须了解的55个经典案例</a>
                    </div>
                    <div>
                        <ul class="active-list">
                            <li>
                                <a>
                                    <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+PHRpdGxlPkNBQ0Y5MUY0LTc2RUItNDFENS1CRjZELTdCNTBGNUY4NjUwNTwvdGl0bGU+PGRlZnM+PHJlY3QgaWQ9ImEiIHk9IjU0IiB3aWR0aD0iNjAiIGhlaWdodD0iMjUiIHJ4PSIxIi8+PG1hc2sgaWQ9ImIiIHg9IjAiIHk9IjAiIHdpZHRoPSI2MCIgaGVpZ2h0PSIyNSIgZmlsbD0iI2ZmZiI+PHVzZSB4bGluazpocmVmPSIjYSIvPjwvbWFzaz48L2RlZnM+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTkgLTU2KSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48dXNlIHN0cm9rZT0iI0VERUVFRiIgbWFzaz0idXJsKCNiKSIgc3Ryb2tlLXdpZHRoPSIyIiB4bGluazpocmVmPSIjYSIvPjxwYXRoIGQ9Ik0xOS4wNSA2Mi43OTdjLS4yMDgtLjI2OC0xLjc3Ni0yLjE4OC0zLjYyOS0xLjcyNS0uNjYyLjE2NS0xLjQzOS40NC0yLjAwOSAxLjQ2My0yLjE4IDMuOTEzIDQuOTY1IDguOTgzIDUuNjE1IDkuNDMzVjcybC4wMjMtLjAxNi4wMjMuMDE2di0uMDMyYy42NS0uNDUgNy43OTUtNS41MiA1LjYxNS05LjQzMy0uNTctMS4wMjMtMS4zNDctMS4yOTgtMi4wMDktMS40NjMtMS44NTMtLjQ2My0zLjQyIDEuNDU3LTMuNjI5IDEuNzI1eiIgZmlsbD0iI0IyQkFDMiIvPjwvZz48L3N2Zz4=">
                                    <span>69</span>
                                </a>
                            </li>
                            <li>
                                <a>
                                    <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+PHRpdGxlPjc1MzFEREU0LTZCMzgtNDI4Ny04QTJBLUY2ODVGMDgzNUFGQzwvdGl0bGU+PGRlZnM+PHJlY3QgaWQ9ImEiIHg9IjU5IiB5PSI1NCIgd2lkdGg9IjU0IiBoZWlnaHQ9IjI1IiByeD0iMSIvPjxtYXNrIGlkPSJiIiB4PSIwIiB5PSIwIiB3aWR0aD0iNTQiIGhlaWdodD0iMjUiIGZpbGw9IiNmZmYiPjx1c2UgeGxpbms6aHJlZj0iI2EiLz48L21hc2s+PC9kZWZzPjxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKC02OCAtNTYpIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGZpbGw9IiNCMkJBQzIiIGQ9Ik03MiA2MXY4LjAzOGg0LjQ0NEw4MS4xMTEgNzJ2LTIuOTYySDg0VjYxeiIvPjx1c2Ugc3Ryb2tlPSIjRURFRUVGIiBtYXNrPSJ1cmwoI2IpIiBzdHJva2Utd2lkdGg9IjIiIHhsaW5rOmhyZWY9IiNhIi8+PC9nPjwvc3ZnPg==">
                                    <span>69</span>
                                </a>
                            </li>
                        </ul>
                        
                    </div>
                </div>
               <img class="picture" src="https://user-gold-cdn.xitu.io/2018/3/22/1624db5c7a6b7abe?imageView2/1/w/120/h/120/q/85/format/webp/interlace/1">
            </a>
        </li>
        <li class="content-box">
            muuu
        </li>
    </ul>
</template>

<script>

export default {
    name:'recommend',
    components: {
      
    },
    data() {
        return {
        }
    },
    computed: {
        
    },
    ready: function () {
        
    },
    methods: {
      
    }
}

</script>
