package capstone.manager.domain;

import capstone.manager.data.AppUserRepository;
import capstone.manager.models.AppUser;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;

import static capstone.manager.TestHelper.makeResult;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
public class AppUserServiceTest {

    @MockBean
    AppUserRepository repository;

    @MockBean
    PasswordEncoder passwordEncoder;

    @Autowired
    AppUserService service;

    @Test
    void shouldThrowUsernameNotFoundExceptionForMissingUser() {
        assertThrows(UsernameNotFoundException.class, () -> {
            service.loadUserByUsername("missing_username");
        });
    }

    @Test
    void shouldAddValidUser() {
        AppUser expected = new AppUser(5, "test1@test.com", "hashed_password", true, List.of("USER"));

        when(passwordEncoder.encode(any())).thenReturn("hashed_password");
        when(repository.add(any())).thenReturn(expected);

        Result<AppUser> actual = service.add("test1@test.com", "P@ssw0rd!");

        assertTrue(actual.isSuccess());
        assertEquals(expected, actual.getPayload());
    }

    @Test
    void shouldNotAddNullUsername() {
        Result<AppUser> expected = makeResult("username is required", null);

        Result<AppUser> actual = service.add(null, "P@ssw0rd!");

        assertEquals(expected, actual);
    }

    @Test
    void shouldNotAddBlankUsername() {
        Result<AppUser> expected = makeResult("username is required", null);

        Result<AppUser> actual = service.add("", "P@ssw0rd!");

        assertEquals(expected, actual);
    }

    @Test
    void shouldNotAddNullPassword() {
        Result<AppUser> expected = makeResult("password is required", null);

        Result<AppUser> actual = service.add("username@example.com", null);

        assertEquals(expected, actual);
    }

    @Test
    void shouldNotAddBlankPassword() {
        Result<AppUser> expected = makeResult("password is required", null);

        Result<AppUser> actual = service.add("username@example.com", "");

        assertEquals(expected, actual);
    }

    @Test
    void shouldNotAddTooShortPassword() {
        Result<AppUser> expected = makeResult("password must be at least 8 character and contain a digit, a letter, and a non-digit/non-letter", null);

        Result<AppUser> actual = service.add("username@example.com", "P@ssw0r");

        assertEquals(expected, actual);
    }

    @Test
    void shouldNotAddPasswordWithNoDigit() {
        Result<AppUser> expected = makeResult("password must be at least 8 character and contain a digit, a letter, and a non-digit/non-letter", null);

        Result<AppUser> actual = service.add("username@example.com", "P@ssword");

        assertEquals(expected, actual);
    }

    @Test
    void shouldNotAddPasswordWithNoSpecialCharacter() {
        Result<AppUser> expected = makeResult("password must be at least 8 character and contain a digit, a letter, and a non-digit/non-letter", null);

        Result<AppUser> actual = service.add("username@example.com", "Passw0rd");

        assertEquals(expected, actual);
    }

    @Test
    void shouldNotAddPasswordWithNoLetters() {
        Result<AppUser> expected = makeResult("password must be at least 8 character and contain a digit, a letter, and a non-digit/non-letter", null);

        Result<AppUser> actual = service.add("username@example.com", "9455702@");

        assertEquals(expected, actual);
    }

    @Test
    void shouldNotAddDuplicateUsername() {
        AppUser existing = new AppUser(5, "existing@test.com", "password", true, List.of("USER"));

        when(repository.findByUsername("existing@test.com")).thenReturn(existing);

        Result<AppUser> expected = makeResult("the provided username already exists", null);

        Result<AppUser> actual = service.add("existing@test.com", "P@ssw0rd!");

        assertEquals(expected, actual);
    }
}
