<nav class="navbar navbar-light bg-light">
    <a class="navbar-brand" href="/">
        <img src="${pageContext.request.contextPath}/img/favicon.ico" width="16" height="16" alt="Home page">Library Online&trade;
    </a>
    <div class="float-right">
        <a class="language" href="${pageContext.request.contextPath}?lang=en">en</a>
        <a class="language" href="${pageContext.request.contextPath}?lang=ru">ru</a>
    </div>

    <sec:authorize access="isAuthenticated()">
        <div class="float-right">
            <div class="float-left">
                <p><sec:authentication property="principal.username" />&nbsp;&nbsp;</p>
            </div>
            <div class="float-right">
                <a class="btn-secondary btn-sm" role="button" id="logoutBut"
                   href="/logout"><spring:message code="logout" /></a>
            </div>
        </div>
    </sec:authorize>
</nav>
