package com.project.bookie.security;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

public class CustomAccessSuccessHandler implements AuthenticationSuccessHandler {

	@Override
	public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication auth)
			throws IOException, ServletException {
		List<String> roleNames = new ArrayList<>();
		auth.getAuthorities().forEach(authority -> {
			roleNames.add(authority.getAuthority());
		});
		if (roleNames.contains("ROLE_ADMIN")) {
			request.getSession().setMaxInactiveInterval(60 * 60); // 1시간
			response.sendRedirect("/admin");
		} else if (roleNames.contains("ROLE_MEMBER")) {
			request.getSession().setMaxInactiveInterval(60 * 60); // 1시간
			response.sendRedirect("/");
		}
	}
}
