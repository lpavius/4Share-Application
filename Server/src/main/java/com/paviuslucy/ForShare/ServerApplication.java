package com.paviuslucy.ForShare;

import com.paviuslucy.ForShare.services.ApplicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
//@EnableAutoConfiguration(exclude = {SecurityAutoConfiguration.class})
public class ServerApplication {

	@Autowired
	private ApplicationService applicationService;

	public static void main(String[] args) {
		SpringApplication.run(ServerApplication.class, args);
	}

	/*@Bean
	public CommandLineRunner  commandLineRunner() {
		return args -> {
			//applicationService.deleteRepository();
			//applicationService.initRepository();
			applicationService.insertData();
		};
	}*/

}
