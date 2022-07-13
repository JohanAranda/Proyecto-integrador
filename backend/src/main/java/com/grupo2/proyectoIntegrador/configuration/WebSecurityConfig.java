package com.grupo2.proyectoIntegrador.configuration;

import com.grupo2.proyectoIntegrador.configuration.authentication.CustomJwtAuthenticationFilter;
import com.grupo2.proyectoIntegrador.configuration.authentication.JwtAuthenticationEntryPoint;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private CustomJwtAuthenticationFilter customJwtAuthenticationFilter;

    @Autowired
    private JwtAuthenticationEntryPoint unauthorizedHandler;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    @Override
    protected AuthenticationManager authenticationManager() throws Exception {
        return super.authenticationManager();
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder());
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable()
                .authorizeRequests()
                // Todos los GETs van a ser publicos
                .antMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                .antMatchers(HttpMethod.GET, "/**").permitAll()
                // El POST para hacer la autenticacion del user tiene que ser publico
                .antMatchers(HttpMethod.POST, "/authenticate").permitAll()
                // El POST para la creacion de usuarios tambien tiene que ser publico
                .antMatchers(HttpMethod.POST, "/usuarios").permitAll()
                .antMatchers(HttpMethod.GET, "/usuarios/me").permitAll()
                // Todas las demas acciones para usuarios son para ADMIN o USER
                .antMatchers("/usuarios/**").hasAnyAuthority("ADMIN", "USER")
                // La creacion de productos y reservas es para ADMIN o USER
                .antMatchers("/reservas/**").hasAnyAuthority("ADMIN", "USER")
                .antMatchers("/productos/**").hasAnyAuthority("ADMIN", "USER")
                // La creacion de categorias y ciudades es solo para ADMIN
                .antMatchers("/categorias/**").hasAuthority("ADMIN")
                .antMatchers("/ciudades/**").hasAuthority("ADMIN")
                .and().exceptionHandling()
                .authenticationEntryPoint(unauthorizedHandler)
                .and().sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS);

        http.addFilterBefore(customJwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);
    }
}
