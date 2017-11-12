<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<li class="nav-item active">
    <a class="nav-link" href="${pageContext.request.contextPath}/"><spring:message
            code="Home" />
        <span class="sr-only">(current)</span></a>
</li>
<li class="nav-item">
    <a class="nav-link" href="/admin/orders"><spring:message
            code="showOrders" /></a>
</li>
<li class="nav-item">
    <a class="nav-link" href="/admin/delivered"><spring:message code="deliveredBooks" /></a>
</li>
<li class="nav-item">
    <a class="nav-link" href="/admin/readers"><spring:message code="showReaders" /></a>
</li>
<li class="nav-item">
    <a class="nav-link" href="/admin/add/books"><spring:message code="addBooks" /></a>
</li>
<li class="nav-item">
    <a class="nav-link" href="/admin/add/authors"><spring:message code="addAuthors" /></a>
</li>
