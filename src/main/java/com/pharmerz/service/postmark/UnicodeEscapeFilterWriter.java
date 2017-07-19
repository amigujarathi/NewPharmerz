package com.pharmerz.service.postmark;
import java.io.FilterWriter;
import java.io.IOException;
import java.io.StringWriter;
import java.io.Writer;

/**
 * Created by User on 12-01-2017.
 */
public class UnicodeEscapeFilterWriter extends FilterWriter{


    protected UnicodeEscapeFilterWriter(Writer out) {
        super(out);
    }

    private static char[] prefix = { '\\', 'u', '0', '0', '0' };


    @Override
    public void write(char[] cbuf, int off, int len) throws IOException {
        for (int i = 0; i < len; i++) {
            if ((cbuf[i] > '\u007f')) {
                String hx = Integer.toHexString(cbuf[i]);
                out.write(prefix, 0, 6 - hx.length());
                out.write(hx);
            } else
                out.write(cbuf[i]);
        }
    }

    @Override
    public void write(int c) throws IOException {
        write(new char[] {(char)c}, 0, 1);
    }

    @Override
    public void write(String str, int off, int len) throws IOException {
        write(str.toCharArray(), off, len);
    }


    /**
     * Escapes <tt>str</tt> using this Filter.
     * <p>
     * Default estimate for non-ASCII chars ratio is 3%
     *
     * @param str the original String
     * @return the escaped String
     * @throws IOException
     */
    public static String escape(String str) throws IOException {
        return escape(str, .03f);
    }

    /**
     * Escapes <tt>str</tt> using this Filter.
     *
     * @param str the original String
     * @param estimatedNonASCIIRatio an estimation of the ratio of non-ASCII chars in <tt>str</tt>.
     * It is used for the initial allocation size of the new char array.
     * @return the escaped String
     * @throws IOException
     */
    public static String escape(String str, float estimatedNonASCIIRatio) throws IOException {
        StringWriter out = new StringWriter(Math.round(str.length() * (1 + estimatedNonASCIIRatio * 5)));
        UnicodeEscapeFilterWriter fw = new UnicodeEscapeFilterWriter(out);
        fw.write(str);
        return out.toString();

    }
}
