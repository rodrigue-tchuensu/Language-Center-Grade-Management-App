package de.home.tchuensu.GradeManagementServer;

import de.home.tchuensu.GradeManagementServer.services.entity.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

//For a start I don't want to implement the security apsect of the app
// to prevent the springboot security autoconfiguration I use the exclude property
//(exclude = { SecurityAutoConfiguration.class })
@SpringBootApplication
public class GradeManagementServerApplication  {    //implements CommandLineRunner {


	@Bean
	public BCryptPasswordEncoder bCryptPasswordEncoder() {
		return new BCryptPasswordEncoder();
	}



	public static void main(String[] args) {
		SpringApplication.run(GradeManagementServerApplication.class, args);
	}
}
