package TIROCINIO.NonSpreco;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.users.UserService;
import com.google.appengine.api.users.UserServiceFactory;

/**
 * Servlet implementation class Login
 */
@WebServlet(name = "Login", value = "/login")
public class Login extends HttpServlet {
	private UserService us;
	private DatastoreService ds;
	
    public Login() {
    	us = UserServiceFactory.getUserService();
		ds = DatastoreServiceFactory.getDatastoreService();
    }
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		if(us.isUserLoggedIn()) {
			response.sendRedirect("/index.html");
		}else {
			response.sendRedirect(us.createLoginURL("/login"));
		}
		response.getWriter().append("Served at: ").append(request.getContextPath());
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}

}