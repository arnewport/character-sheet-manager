package capstone.manager.domain;

import capstone.manager.data.SheetRepository;
import capstone.manager.models.Sheet;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import static capstone.manager.TestHelper.makeResult;
import static capstone.manager.TestHelper.makeSheet;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
public class SheetServiceTest {

    @Autowired
    SheetService service;

    @MockBean
    SheetRepository repository;

    @Test
    void shouldFindById() {
        Sheet expected = makeSheet(1);

        when(repository.findById(1)).thenReturn(makeSheet(1));

        Sheet actual = service.findById(1);

        assertEquals(expected, actual);
    }

    @Test
    void shouldCreate() {
        Result<Sheet> expected = makeResult(null, makeSheet(1));
        Sheet sheet = makeSheet(1);
        sheet.setId(0);

        when(repository.create(any())).thenReturn(makeSheet(1));

        Result<Sheet> actual = service.create(sheet);

        assertEquals(expected, actual);
    }

    @Test
    void shouldNotCreateIfNull() {
        Result<Sheet> expected = makeResult("sheet cannot be null", null);
        Result<Sheet> actual = service.create(null);
        assertEquals(expected, actual);
    }

    @Test
    void shouldUpdate() {
        Result<Sheet> expected = makeResult(null, null);
        Sheet sheet = makeSheet(1);

        when(repository.update(any())).thenReturn(true);

        Result<Sheet> actual = service.update(sheet);

        assertEquals(expected, actual);
    }

    @Test
    void shouldNotUpdateIfNull() {
        Result<Sheet> expected = makeResult("sheet cannot be null", null);
        Result<Sheet> actual = service.update(null);
        assertEquals(expected, actual);
    }

    @Test
    void shouldDelete() {
        when(repository.deleteById(1)).thenReturn(true);
        assertTrue(service.deleteById(1));
    }

    @Test
    void shouldNotDeleteIfMissing() {
        when(repository.deleteById(-1)).thenReturn(false);
        assertFalse(service.deleteById(-1));
    }
}
