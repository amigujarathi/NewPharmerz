package com.pharmerz;

import org.junit.Assert;
import org.junit.BeforeClass;
import org.junit.Test;
import org.junit.internal.runners.JUnit4ClassRunner;
import org.junit.runner.RunWith;

import javax.validation.constraints.AssertFalse;
import java.util.regex.Pattern;

/**
 * Created by ankur on 20-11-2016.
 */
public class UsernamePatternTest {

    public static Pattern pattern;

    @BeforeClass
    public static void init(){
        pattern = Pattern.compile("^[a-z][_]?[a-z0-9]+[_]?[a-z0-9]+$");

    }


    @Test
    public void canNotStartWith_(){
        String username = "_ankur";
        Assert.assertFalse(pattern.matcher(username).matches());
    }

    @Test
    public void canNotHaveAdjacent_(){
        String username = "a__nkur";
        Assert.assertFalse(pattern.matcher(username).matches());
    }

    @Test
    public void canNotEndWith_(){
        String username = "ankur_";
        Assert.assertFalse(pattern.matcher(username).matches());
    }

    @Test public void canNotStartWithDigit(){
        String username = "7ankur";
        Assert.assertFalse(pattern.matcher(username).matches());
    }

    @Test
    public void secondCharacterCanBe_(){
        String username = "a_nkur";
        Assert.assertTrue(pattern.matcher(username).matches());
    }


    @Test
    public void secondCharacterCanBeDigit(){
        String username = "a7nkur";
        Assert.assertTrue(pattern.matcher(username).matches());

    }

    @Test
    public void correctUsernameOne(){
        String username = "a_n7ku_r";
        Assert.assertTrue(pattern.matcher(username).matches());
    }

    @Test
    public void correctUsernameTwo(){
        String username = "a_n7ku_r7";
        Assert.assertTrue(pattern.matcher(username).matches());
    }





}
