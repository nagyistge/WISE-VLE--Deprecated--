/**
 * 
 */
package vle;

import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.LinkedList;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * @author hirokiterashima
 *
 */
public class VLEGetData extends HttpServlet {


	private static final long serialVersionUID = 1L;

	public void doGet(HttpServletRequest request,
			HttpServletResponse response)
	throws ServletException, IOException {
        createConnection();
        getData(request, response);
        shutdown();
	}
		

	private static void getData(HttpServletRequest request,
			HttpServletResponse response) {
		String idStr = request.getParameter("dataId");
		
		if(idStr==null || idStr == ""){ //do nothing, no id
			return;
		}
		
		//parse ids
		String[] ids = idStr.split(":");
		
		if(ids != null && ids.length > 0){
			try{
				stmt = conn.createStatement();
	    		ResultSet results = null;
	    		
		    	//open XML String
		    	response.getWriter().write("<vle_states>");
		    		
	    		//then retrieve latest data for each of the ids
	    		for(int x = 0; x < ids.length; x++){
	    			results = stmt.executeQuery("select data from vledata where dataId=" + ids[x] + " order by timestamp desc");
	    			results.first();
	    			
	    			//add first result (latest entry by timestamp) to XML String
	    			response.getWriter().write("<workgroup dataId='" + ids[x] +"'>" + results.getString(1) + "</workgroup>");
	    			
	    			results.close();
	    			results = null;
	    		}
	    				
	    		//close XML String
		    	response.getWriter().write("</vle_states>");
	    		
		    	stmt.close();
			} catch (SQLException sqlExcept){
	            sqlExcept.printStackTrace();
	        } catch (IOException e){
	        	e.printStackTrace();
	        }
			
		}
		
	}


	private static String tableName = "restaurants";
    // jdbc Connection
    private static Connection conn = null;
    private static Statement stmt = null;

    public static void main(String[] args)
    {
        createConnection();
        createTable();
        shutdown();
    }
    
    private static void createConnection()
    {
        try
        {
//            //Class.forName("org.apache.derby.jdbc.ClientDriver").newInstance();
//            Class.forName("org.hsqldb.jdbcDriver").newInstance();
//            //Get a connection
//            //conn = DriverManager.getConnection(dbURL); 
//            conn = DriverManager.getConnection("jdbc:hsqldb:file:testdb", "sa", "");
            
        	//create a connection to the mysql db
        	Class.forName("com.mysql.jdbc.Driver").newInstance();
        	conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/vle_database", "sailuser", "sailpass");
        }
        catch (Exception except)
        {
            except.printStackTrace();
        }
    }
    
    private static void createTable()
    {
        try
        {
            stmt = conn.createStatement();
            stmt.execute("create table vledata (id bigint auto_increment, dataId bigint NOT NULL, data longtext, timestamp timestamp not null, primary key(id));");
            stmt.close();
            
            stmt = conn.createStatement();
            stmt.execute("create table username_to_dataid (id bigint auto_increment, userName varchar(20) UNIQUE NOT NULL, dataId bigint UNIQUE NOT NULL, primary key(id));");
            stmt.close();
        }
        catch (SQLException sqlExcept)
        {
            sqlExcept.printStackTrace();
        }
    }
    
    
    private static void printData(HttpServletRequest request, HttpServletResponse response)
    {
    	String userNameStr = request.getParameter("userName");
    	String idStr = request.getParameter("dataId");
    	
        try
        {
            stmt = conn.createStatement();
            ResultSet results = null;
            
            /*
             * We will try to look up the data for the userName but
             * if that was not passed as an argument we will look
             * up the data for the dataId  
             */
            if(userNameStr != null && !userNameStr.equals("")) {
            	//user has requested data for a username
            	results = stmt.executeQuery("select vledata.data from username_to_dataid, vledata where username_to_dataid.dataId = vledata.dataId and username_to_dataid.userName = '" + userNameStr + "'");
            } else if(idStr != null && !idStr.equals("")) {
            	//user has requested data for a dataid
                results = stmt.executeQuery("select data from vledata where dataId = '" + idStr + "'");
            }
            
            if(results != null) {
            	while(results.next())
                {
                	response.getWriter().print(results.getString(1));
                }
                results.close();
            }

            stmt.close();
        }
        catch (SQLException sqlExcept)
        {
            sqlExcept.printStackTrace();
        } catch (IOException e) {
        	System.err.println("could not write to response");
			e.printStackTrace();
		}
    }
    

    private static void shutdown() {
    	try {
    		conn.close();
    	} catch(SQLException sqlExcept) {
    		sqlExcept.printStackTrace();
    	}
    }
    
}
