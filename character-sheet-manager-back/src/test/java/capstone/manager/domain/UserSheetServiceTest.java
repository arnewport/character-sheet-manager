package capstone.manager.domain;

import capstone.manager.data.UserSheetRepository;
import capstone.manager.models.UserSheet;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.util.ArrayList;
import java.util.List;

import static capstone.manager.TestHelper.*;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
public class UserSheetServiceTest {

    @Autowired
    UserSheetService service;

    @MockBean
    UserSheetRepository repository;

    @Test
    void shouldFindUserSheetsByUserId() {
        UserSheet userSheet = makeUserSheet(1, 1, 1);
        List<UserSheet> expected = new ArrayList<>();
        expected.add(userSheet);

        when(repository.findUserSheetsByUserId(1)).thenReturn(expected);

        List<UserSheet> actual = service.findUserSheetsByUserId(1);

        assertEquals(expected, actual);
    }

    @Test
    void shouldFindUserIdsBySheetId() {
        List<Integer> expected = new ArrayList<>();
        expected.add(1);

        when(repository.findUserIdsBySheetId(1)).thenReturn(expected);

        List<Integer> actual = service.findUserIdsBySheetId(1);

        assertEquals(expected, actual);
    }

    @Test
    void shouldCreate() {
        Result<UserSheet> expected = makeResult(null, makeUserSheet(1, 1, 1));
        UserSheet userSheet = makeUserSheet(1, 1, 1);
        userSheet.setId(0);

        when(repository.create(any())).thenReturn(makeUserSheet(1, 1, 1));

        Result<UserSheet> actual = service.create(userSheet);

        assertEquals(expected, actual);
    }

    @Test
    void shouldNotCreateIfNull() {
        Result<UserSheet> expected = makeResult("user sheet cannot be null", null);
        Result<UserSheet> actual = service.create(null);
        assertEquals(expected, actual);
    }

    @Test
    void shouldDeleteBySheetId() {
        when(repository.deleteBySheetId(1)).thenReturn(true);
        assertTrue(service.deleteBySheetId(1));
    }

    @Test
    void shouldNotDeleteBySheetIdIfMissing() {
        when(repository.deleteBySheetId(-1)).thenReturn(false);
        assertFalse(service.deleteBySheetId(-1));
    }
}
